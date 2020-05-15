import React, {Component} from "react";

import DidResolverUtil from "../util/DidResolverUtil";
import Web3ContractUtil from "../util/Web3ContractUtil";

import VerifiedForm from './VerifiedForm';
import VerifiedSummary from './VerifiedSummary';
import VerifiedDetail from './VerifiedDetail';

import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import HashingUtil from "../util/HashingUtil";
import './App.scss';

class App extends Component {

  state = {
    fileMD5: "", jwtMD5: "", signerDID: "", signerName: "", subjectName: "",
    submitClicked: false, jwt: "", iatDate: "", nbfDate: "", issuanceDate: "",
    expirationDate: "", verifiedVC: {}, isLoading: false
  };

  handleOnDrop = async (file) => {
    const fileMD5 = await HashingUtil.fileToMd5(file);
    this.setState({ fileMD5 });
  };

  handleFileSubmit = async (did) => {
    this.setState({isLoading: true});
    const jwt = await DidResolverUtil.getJWTByDid(did);
    let verifiedVC;
    try {
      const resolver = DidResolverUtil.getResolver();
      verifiedVC = await VerifiedCredentialUtil.getVerifiedCredential(jwt, resolver);
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message, isLoading: false });
      return;
    }

    // extracting key information from vc
    const iatDate = new Date(verifiedVC.payload.iat * 1000).toUTCString();
    const nbfDate = new Date(verifiedVC.payload.nbf * 1000).toUTCString();
    const expirationDate = new Date(verifiedVC.payload.vc.expirationDate).toUTCString();
    const issuanceDate = new Date(verifiedVC.payload.vc.issuanceDate).toUTCString();
    const signerDID = verifiedVC.signer.owner;
    const signerName = await Web3ContractUtil.getTextRecordByDID(signerDID);
    const subjectName = await Web3ContractUtil.getTextRecordByDID(verifiedVC.payload.vc.credentialSubject.id);
    const jwtMD5 = verifiedVC.payload.vc.credentialSubject.TexasNotary.documentHash;

    // window.location.href = "#middle";
    // window.vc = verifiedVC;

    this.setState({ iatDate, nbfDate, expirationDate, issuanceDate, decodedJwt: JSON.stringify(verifiedVC),
      signerDID, jwt, verifiedVC, signerName, subjectName, jwtMD5, isLoading: false});
  };

  render() {
    const { fileMD5, jwtMD5, signerDID, signerName, subjectName,
      verifiedVC, expirationDate, iatDate, nbfDate, issuanceDate,
      decodedJwt, isLoading } = { ...this.state };
    return (
      <div className="container">
        <VerifiedForm
          handleOnDrop={this.handleOnDrop}
          handleFileSubmit={this.handleFileSubmit}
          isLoading={isLoading}
        />
        <VerifiedSummary
          fileMD5={fileMD5} jwtMD5={jwtMD5} signerName={signerName} verifiedVC={verifiedVC}
          expirationDate={expirationDate} iatDate={iatDate} nbfDate={nbfDate} issuanceDate={issuanceDate}
        />
        <VerifiedDetail
            expirationDate={expirationDate} iatDate={iatDate} nbfDate={nbfDate} issuanceDate={issuanceDate}
            verifiedVC={verifiedVC} fileMD5={fileMD5} jwtMD5={jwtMD5} signerDID={signerDID}
            signerName={signerName} subjectName={subjectName} decodedJwt={decodedJwt}
        />
      </div>
    );
  }
}
export default App;
