import React, { Component } from "react";

import DidResolverUtil from "../util/DidResolverUtil";
import Web3ContractUtil from "../util/Web3ContractUtil";

import VerifiedForm from "./VerifiedForm";
import VerifiedSummary from "./VerifiedSummary";
import VerifiedDetail from "./VerifiedDetail";

import EncryptionUtil from "../util/EncryptionUtil";
import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import HashingUtil from "../util/HashingUtil";
import StringUtil from "../util/StringUtil";
import "./App.scss";
import NotarySearchUtil from "../util/NotarySearchUtil";
import { format, addMinutes, parse, isSameDay } from "date-fns";

class App extends Component {
  state = {
    documentDID: "",
    vpJwt: "",
    vcJwt: "",
    ownerPublicKey: "",
    file: undefined,
    fileMD5: "",
    jwtMD5: "",
    signerDID: "",
    signerName: "",
    signerId: "",
    subjectDID: "",
    subjectName: "",
    notaryInfo: {},
    submitClicked: false,
    iatDate: "",
    nbfDate: "",
    issuanceDate: "",
    expirationDate: "",
    didTransactionTimestamp: "",
    verifiedVC: {},
    isLoading: false,
    isDone: false,
    awsTimestamp: -1,
  };

  componentDidMount() {
    // let { did, jwt } = useParams();
    this.wakeUpProxyServer();
    if (window.location.href.indexOf("texas-notary-lookup") !== -1) {
      let notaryIdStartIndex = window.location.href.lastIndexOf("/");
      let notaryId = window.location.href.slice(
        notaryIdStartIndex + 1,
        window.location.href.length
      );
      this.notaryLookkup(notaryId);
    }

    // TODO: Get did from params
    // console.log(window.location.query.jwt);
    // let params = new URL(document.location).did;
    // if (params !== undefined && params.get("did") !== undefined) {
    //   this.setState({ documentDID: params.get("did") });
    //   console.log();
    // }
  }

  // Since we are using a free heroku proxy server we need to "wake it up" on load
  wakeUpProxyServer = async () => {
    fetch("https://cors-elsewhere.herokuapp.com/");
  };

  notaryLookkup = async (notaryId) => {
    let notaryInfo = await NotarySearchUtil.findNotary(notaryId);
    this.setState({ notaryInfo });
  };

  handleOnDrop = async (file) => {
    this.setState({ file });
  };

  handleFileSubmit = async (documentDID) => {
    let {
      iatDate,
      nbfDate,
      expirationDate,
      issuanceDate,
      issuanceDateIso,
      didTransactionTimestamp,
      didTransactionDate,
      signerDID,
      signerName,
      subjectDID,
      subjectName,
      signerId,
      notaryInfo,
    } = { ...this.state };
    const { file } = { ...this.state };
    this.setState({ isLoading: true });

    const { vpJwt, vcJwt, ownerPublicKey, timestamp } = {
      ...(await DidResolverUtil.getInfoByDocumentDid(documentDID)),
    };

    //1
    await this.setState({
      documentDID,
      vpJwt,
      vcJwt,
      ownerPublicKey,
    });

    console.log({ vpJwt });
    console.log({ vcJwt });

    if (vpJwt === undefined && vcJwt === undefined) {
      console.error("JWT Not found!");
      return;
    }

    this.setState({ awsTimestamp: timestamp });

    let verifiedVP;
    let verifiedVC;
    try {
      const resolver = DidResolverUtil.getResolver();

      if (vpJwt !== undefined && vpJwt.length > 0) {
        verifiedVP = await VerifiedCredentialUtil.getVerifiedPresentation(
          vpJwt,
          resolver
        );

        //1a
        this.setState({ verifiedVP });
      }

      let vcJWTFromVp;

      if (vcJwt !== undefined && vcJwt.length > 0) {
        vcJWTFromVp = vcJwt;
      } else {
        vcJWTFromVp = verifiedVP.payload.vp.verifiableCredential[0];
      }
      verifiedVC = await VerifiedCredentialUtil.getVerifiedCredential(
        vcJWTFromVp,
        resolver
      );
      // TODO: compare vp.payload.iss to vc.payload.vc.credentialSubject.id subjectDID for step 12?
      //1b
      console.log({ verifiedVC });
      this.setState({ verifiedVC });
    } catch (e) {
      console.error(e.message);
      this.setState({ error: e.message, isLoading: false });
      return;
    }

    //2
    const notaryX509PublicKey = verifiedVC.payload.vc.issuer.notaryPublicKey;
    const signedMd5 =
      verifiedVC.payload.vc.credentialSubject.TexasDigitalNotary
        .signedDocumentHash;

    console.log({ notaryX509PublicKey });
    console.log({ signedMd5 });
    const jwtMD5 = EncryptionUtil.decryptX509(notaryX509PublicKey, signedMd5);

    this.setState({
      notaryX509PublicKey,
      signedMd5,
      jwtMD5,
    });

    //3
    const base64 = await StringUtil.fileContentsToString(file);
    this.setState({ base64: base64 });

    //4
    const fileMD5 = await HashingUtil.fileToMd5(file);
    this.setState({ fileMD5 });

    //6
    signerDID = verifiedVC.payload.vc.issuer.id;
    signerName = await Web3ContractUtil.getTextRecordByDID(signerDID);

    //7
    signerId = verifiedVC.payload.vc.issuer.notaryId;

    //8
    notaryInfo = await NotarySearchUtil.findNotary(signerId);

    // extracting key information from vc
    const dateFormat = "yyyy-MM-dd H:mm:ss";
    iatDate = new Date(verifiedVC.payload.iat * 1000).toUTCString(); // (Issued At) Claim
    nbfDate = new Date(verifiedVC.payload.nbf * 1000).toUTCString(); // (Not Before) Claim
    expirationDate = new Date(
      verifiedVC.payload.vc.expirationDate
    ).toUTCString();
    const issuanceDt = new Date(verifiedVC.payload.vc.issuanceDate);
    issuanceDate = format(
      addMinutes(issuanceDt, issuanceDt.getTimezoneOffset()),
      dateFormat
    );
    issuanceDateIso = issuanceDt.toUTCString();

    let didTransactionDt;

    try {
      if (this.state.awsTimestamp > -1) {
        didTransactionDt = new Date(this.state.awsTimestamp * 1000);
      } else {
        didTransactionDt = new Date(
          (await Web3ContractUtil.getDidTransactionTimestamp(documentDID)) *
            1000
        );
      }
    } catch (err) {
      console.error(
        "invalid date, continuing with ropsten testnet transaction"
      );
    }

    if (didTransactionDt.toString() == "Invalid Date") {
      didTransactionDt = new Date();
      console.error(
        "invalid date, continuing because this is with ropsten testnet transaction"
      );
    }

    didTransactionDate = didTransactionDt.toUTCString();
    didTransactionTimestamp = format(
      addMinutes(didTransactionDt, didTransactionDt.getTimezoneOffset()),
      dateFormat
    );
    // signerDID = verifiedVC.signer.owner; can also get it from here
    subjectDID = verifiedVC.payload.vc.credentialSubject.id;
    subjectName = await Web3ContractUtil.getTextRecordByDID(subjectDID);

    this.setState({
      iatDate,
      nbfDate,
      expirationDate,
      issuanceDate,
      issuanceDateIso,
      didTransactionTimestamp,
      didTransactionDate,
      signerDID,
      signerName,
      subjectName,
      subjectDID,
      signerId,
      notaryInfo,
    });
  };

  handleSuccessFail = (accordionId) => {
    const {
      fileMD5,
      signedMd5,
      jwtMD5,
      didTransactionTimestamp,
      issuanceDate,
      verifiedVP,
      subjectDID,
    } = {
      ...this.state,
    };
    let isSuccess = false;
    switch (accordionId) {
      case "digital-signed":
        isSuccess = !!signedMd5;
        break;
      case "compare-blockchain":
        isSuccess = fileMD5 && jwtMD5 && fileMD5 === jwtMD5;
        break;
      case "verify-notary":
        isSuccess = true; // FIXME: we can't compare this yet
        break;
      case "time-check":
        const dateFormat = "yyyy-MM-dd H:mm:ss";
        const a = parse(didTransactionTimestamp, dateFormat, new Date());
        const b = parse(issuanceDate, dateFormat, new Date());
        const isSameDay1 = isSameDay(a, b);
        isSuccess = didTransactionTimestamp && issuanceDate && isSameDay1;
        break;
      case "owner-signed":
        isSuccess =
          verifiedVP &&
          verifiedVP.payload.iss &&
          subjectDID &&
          subjectDID === verifiedVP.payload.iss;
        break;
      default:
        isSuccess = true;
    }
    return isSuccess;
  };

  isNotarizedDocument() {
    return (
      this.handleSuccessFail("digital-signed") &&
      this.handleSuccessFail("compare-blockchain") &&
      this.handleSuccessFail("verify-notary") &&
      this.handleSuccessFail("time-check") &&
      this.handleSuccessFail("owner-signed")
    );
  }

  render() {
    if (window.location.href.indexOf("texas-notary-lookup") !== -1) {
      return (
        <div>
          {" "}
          <div className="section-desc">
            Notary Name: {this.state.notaryInfo && this.state.notaryInfo.Name}
          </div>
          <div className="section-desc">
            Notary Address:{" "}
            {this.state.notaryInfo && this.state.notaryInfo.Address}
          </div>
          <div className="section-desc">
            Notary Expires:{" "}
            {this.state.notaryInfo && this.state.notaryInfo.Expires}
          </div>
          <div className="section-desc">
            Notary County:{" "}
            {this.state.notaryInfo && this.state.notaryInfo.County}
          </div>
        </div>
      );
    }
    const {
      documentDID,
      vpJwt,
      ownerPublicKey,
      verifiedVP,
      verifiedVC,
      notaryX509PublicKey,
      signedMd5,
      jwtMD5,
      base64,
      fileMD5,
      signerDID,
      subjectDID,
      signerName,
      subjectName,
      expirationDate,
      didTransactionTimestamp,
      didTransactionDate,
      iatDate,
      nbfDate,
      issuanceDate,
      issuanceDateIso,
      decodedJwt,
      signerId,
      notaryInfo,
      isLoading,
      isDone,
    } = { ...this.state };
    return (
      <div className="app-container">
        <VerifiedForm
          handleOnDrop={this.handleOnDrop}
          handleFileSubmit={this.handleFileSubmit}
          isLoading={isLoading}
        />
        {isDone && (
          <VerifiedSummary
            // fileMD5={fileMD5}
            // jwtMD5={jwtMD5}
            signerName={signerName}
            subjectName={subjectName}
            didTransactionTimestamp={didTransactionDate}
            issuanceDate={issuanceDateIso}
            expirationDate={expirationDate}
            isSuccess={this.isNotarizedDocument()}
            // verifiedVC={verifiedVC}
            // iatDate={iatDate}
            // nbfDate={nbfDate}
          />
        )}
        {(isLoading || isDone) && (
          <VerifiedDetail
            documentDID={documentDID}
            vpJwt={vpJwt}
            ownerPublicKey={ownerPublicKey}
            verifiedVP={verifiedVP}
            verifiedVC={verifiedVC}
            notaryX509PublicKey={notaryX509PublicKey}
            signedMd5={signedMd5}
            jwtMD5={jwtMD5}
            base64={base64}
            fileMD5={fileMD5}
            signerDID={signerDID}
            signerName={signerName}
            didTransactionTimestamp={didTransactionTimestamp}
            issuanceDate={issuanceDate}
            expirationDate={expirationDate}
            iatDate={iatDate}
            nbfDate={nbfDate}
            jwtMD5={jwtMD5}
            subjectDID={subjectDID}
            subjectName={subjectName}
            decodedJwt={decodedJwt}
            signerId={signerId}
            notaryInfo={notaryInfo}
            setDone={() => this.setState({ isLoading: false, isDone: true })}
            handleSuccessFail={this.handleSuccessFail}
          />
        )}
      </div>
    );
  }
}
export default App;
