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
    fileMD5: "",
    jwtMD5: "",
    signerDID: "",
    signerName: "",
    subjectName: "",
    submitClicked: false,
    jwt: "",
    iatDate: "",
    nbfDate: "",
    issuanceDate: "",
    expirationDate: "",
    didTransactionTimestamp: "",
    verifiedVC: {},
    isLoading: false,
  };

  handleOnDrop = async (file) => {
    const fileMD5 = await HashingUtil.fileToMd5(file);
    this.setState({ fileMD5 });
  };

  handleFileSubmit = async (did) => {
    this.setState({ isLoading: true });
    console.log('started');
    const jwt = await DidResolverUtil.getJWTByDid(did);
    let verifiedVP;
    let verifiedVC;
    try {
      const resolver = DidResolverUtil.getResolver();
      verifiedVP = await VerifiedCredentialUtil.getVerifiedPresentation(
        jwt,
        resolver
      );

      let vcJWT = verifiedVP.payload.vp.verifiableCredential[0];
      verifiedVC = await VerifiedCredentialUtil.getVerifiedCredential(
        vcJWT,
        resolver
      );
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message, isLoading: false });
      return;
    }

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
      (await Web3ContractUtil.getDidTransactionTimestamp(did)) * 1000
    ).toUTCString();

    const signerDID = verifiedVC.signer.owner;
    const signerName = await Web3ContractUtil.getTextRecordByDID(signerDID);
    const subjectName = await Web3ContractUtil.getTextRecordByDID(
      verifiedVC.payload.vc.credentialSubject.id
    );

    const signedMd5 =
      verifiedVC.payload.vc.credentialSubject.TexasDigitalNotary
        .signedDocumentHash;
    const notaryX509PublicKey = verifiedVC.payload.vc.issuer.notaryPublicKey;
    const jwtMD5 = EncryptionUtil.decryptX509(notaryX509PublicKey, signedMd5);
    console.log('finished');
    this.setState({
      iatDate,
      nbfDate,
      expirationDate,
      issuanceDate,
      didTransactionTimestamp,
      decodedJwt: JSON.stringify(verifiedVC),
      signerDID,
      jwt,
      verifiedVC,
      signerName,
      subjectName,
      jwtMD5,
      isLoading: false,
    });
  };

  render() {
    const {
      fileMD5,
      jwtMD5,
      signerDID,
      signerName,
      subjectName,
      verifiedVC,
      expirationDate,
      didTransactionTimestamp,
      iatDate,
      nbfDate,
      issuanceDate,
      decodedJwt,
      isLoading,
    } = { ...this.state };
    return (
      <div className="app-container">
        <VerifiedForm
          handleOnDrop={this.handleOnDrop}
          handleFileSubmit={this.handleFileSubmit}
          isLoading={isLoading}
        />
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
        <VerifiedDetail
          expirationDate={expirationDate}
          iatDate={iatDate}
          nbfDate={nbfDate}
          issuanceDate={issuanceDate}
          didTransactionTimestamp={didTransactionTimestamp}
          verifiedVC={verifiedVC}
          fileMD5={fileMD5}
          jwtMD5={jwtMD5}
          signerDID={signerDID}
          signerName={signerName}
          subjectName={subjectName}
          decodedJwt={decodedJwt}
        />
      </div>
    );
  }
}
export default App;
