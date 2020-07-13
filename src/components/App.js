import React, { Component } from "react";

import DidResolverUtil from "../util/DidResolverUtil";
import Web3ContractUtil from "../util/Web3ContractUtil";

import VerifiedForm from "./VerifiedForm";
import VerifiedSummary from "./VerifiedSummary";
import VerifiedDetail from "./VerifiedDetail";

import EncryptionUtil from "../util/EncryptionUtil";
import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import HashingUtil from "../util/HashingUtil";
import "./App.scss";

class App extends Component {
  state = {
    documentDID: "",
    vpJwt: "",
    ownerPublicKey: "",
    fileMD5: "",
    jwtMD5: "",
    signerDID: "",
    signerName: "",
    subjectName: "",
    submitClicked: false,
    iatDate: "",
    nbfDate: "",
    issuanceDate: "",
    expirationDate: "",
    didTransactionTimestamp: "",
    verifiedVC: {},
    isLoading: false,
    isDone: false,
  };

  handleOnDrop = async (file) => {
    const fileMD5 = await HashingUtil.fileToMd5(file);
    this.setState({ fileMD5 });
  };

  handleFileSubmit = async (documentDID) => {
    this.setState({ isLoading: true });
    console.log("started");
    const { vpJwt, ownerPublicKey } = {
      ...(await DidResolverUtil.getInfoByDocumentDid(documentDID)),
    };
    //1
    this.setState({
      documentDID,
      vpJwt,
      ownerPublicKey,
    });
    let verifiedVP;
    let verifiedVC;
    try {
      const resolver = DidResolverUtil.getResolver();
      verifiedVP = await VerifiedCredentialUtil.getVerifiedPresentation(
        vpJwt,
        resolver
      );
      //1a
      this.setState({ verifiedVP });
      let vcJWT = verifiedVP.payload.vp.verifiableCredential[0];
      verifiedVC = await VerifiedCredentialUtil.getVerifiedCredential(
        vcJWT,
        resolver
      );
      //1b
      this.setState({ verifiedVC });
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message, isLoading: false });
      return;
    }
    //2
    const notaryX509PublicKey = verifiedVC.payload.vc.issuer.notaryPublicKey;
    const signedMd5 =
      verifiedVC.payload.vc.credentialSubject.TexasDigitalNotary
        .signedDocumentHash;
    const jwtMD5 = EncryptionUtil.decryptX509(notaryX509PublicKey, signedMd5);
    this.setState({
      notaryX509PublicKey,
      signedMd5,
      jwtMD5,
    });

    // extracting key information from vc
    const iatDate = new Date(verifiedVC.payload.iat * 1000).toUTCString();
    const nbfDate = new Date(verifiedVC.payload.nbf * 1000).toUTCString();
    const expirationDate = new Date(
      verifiedVC.payload.vc.expirationDate
    ).toUTCString();
    const issuanceDate = new Date(
      verifiedVC.payload.vc.issuanceDate
    ).toUTCString();
    const didTransactionTimestamp = new Date(
      (await Web3ContractUtil.getDidTransactionTimestamp(documentDID)) * 1000
    ).toUTCString();

    const signerDID = verifiedVC.signer.owner;
    const signerName = await Web3ContractUtil.getTextRecordByDID(signerDID);
    const subjectName = await Web3ContractUtil.getTextRecordByDID(
      verifiedVC.payload.vc.credentialSubject.id
    );

    console.log("finished");
    this.setState({
      iatDate,
      nbfDate,
      expirationDate,
      issuanceDate,
      didTransactionTimestamp,
      signerDID,
      signerName,
      subjectName,
      isLoading: false,
      isDone: true,
    });
  };

  render() {
    const {
      documentDID,
      vpJwt,
      ownerPublicKey,
      verifiedVP,
      verifiedVC,
      notaryX509PublicKey,
      signedMd5,
      jwtMD5,
      fileMD5,
      signerDID,
      signerName,
      subjectName,
      expirationDate,
      didTransactionTimestamp,
      iatDate,
      nbfDate,
      issuanceDate,
      decodedJwt,
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
            fileMD5={fileMD5}
            jwtMD5={jwtMD5}
            signerName={signerName}
            verifiedVC={verifiedVC}
            expirationDate={expirationDate}
            iatDate={iatDate}
            nbfDate={nbfDate}
            issuanceDate={issuanceDate}
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
            expirationDate={expirationDate}
            iatDate={iatDate}
            nbfDate={nbfDate}
            issuanceDate={issuanceDate}
            didTransactionTimestamp={didTransactionTimestamp}
            fileMD5={fileMD5}
            jwtMD5={jwtMD5}
            signerDID={signerDID}
            signerName={signerName}
            subjectName={subjectName}
            decodedJwt={decodedJwt}
          />
        )}
      </div>
    );
  }
}
export default App;
