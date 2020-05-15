
import React, { Component, Fragment } from 'react';
import ReactJson from "react-json-view";
import { ReactComponent as CheckboxAnimated } from "../img/checkbox-animated.svg";
import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import * as PropTypes from 'prop-types';
import './VerifiedDetail.scss';

class VerifiedDetail extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef()
  }

  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)

  componentDidUpdate(prevProps) {
    if(prevProps.verifiedVC !== this.props.verifiedVC && this.props.verifiedVC && this.props.verifiedVC.jwt) {
      console.log('we are here');
      this.scrollToMyRef();
    }
  }

  renderImageHashMatches() {
    const { fileMD5, jwtMD5 } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck5" />
        <label className="tab-label" htmlFor="chck5">
          <CheckboxAnimated /> Image Verification
        </label>
        <div className="tab-content">
          <div className="rcorners">
            <h5>The uploaded image matches the DID's image signature.</h5>
          </div>
          <p>Document Hash: {fileMD5} </p>
          <p> Did Document Hash: {jwtMD5}</p>
        </div>
      </div>
    );
  }

  renderImageHashDoesNotMatch() {
    const { fileMD5, jwtMD5 } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck5" />
        <label className="tab-label" htmlFor="chck5">
          <img style={{ width: "40px" }} src="./redx.png" alt=""></img> Image
          Verification
        </label>
        <div className="tab-content">
          <div className="rcorners-red">
            <h5 style={{ color: "white" }}>
              The uploaded image DOES NOT match the DID's image signature.
              Please check that the you have the correct image for the correct
              DID.
            </h5>
          </div>
          <p>Document Hash: {fileMD5} </p>
          <p> Did Document Hash: {jwtMD5}</p>
        </div>
      </div>
    );
  }

  renderSignerInformationValid() {
    const { signerDID, signerName } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck3" />
        <label className="tab-label" htmlFor="chck3">
          <CheckboxAnimated />
          Signer Information
        </label>
        <div className="tab-content">
          <div className="rcorners">
            <h5>The signer of this document is a Verified Notary</h5>
          </div>
          <p> Signer DID: {signerDID} </p>
          <p> Signer Name: {signerName} - Verified Mypass Notary</p>
        </div>
      </div>
    );
  }

  renderSignerInformationNotValid() {
    const { signerDID } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck3" />
        <label className="tab-label" htmlFor="chck3">
          <img style={{ width: "40px" }} src="./redx.png" alt=""></img>
          Signer Information
        </label>
        <div className="tab-content">
          <div className="rcorners-red">
            <h5 style={{ color: "white" }}>
              The signer of this document cannot be verified as a Verified
              Notary
            </h5>
          </div>
          <p> Signer DID: {signerDID} </p>
          <p> Signer Name: - UNABLE TO LOCATE SIGNER NAME! - </p>
        </div>
      </div>
    );
  }

  renderTimestampInformationValid() {
    const { expirationDate, iatDate, nbfDate, issuanceDate } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck4" />
        <label className="tab-label" htmlFor="chck4">
          <CheckboxAnimated /> Timestamp Information
        </label>
        <div className="tab-content">
          <div className="rcorners">
            <h5>The timestamp information is valid</h5>
          </div>
          <p>iat ( The time the JWT was issued ) : {iatDate}</p>
          <p>
            nbf ( The time before which the JWT MUST NOT be accepted ) :{" "}
            {nbfDate}
          </p>
          <p>
            Issuance Date ( Date of actual issuance ) :{" "}
            {issuanceDate}
          </p>
          <p>
            Expiration Date ( Date this document expires ) :{" "}
            {expirationDate}
          </p>
        </div>
      </div>
    );
  }

  renderTimestampInformationNotValid() {
    const { expirationDate, iatDate, nbfDate, issuanceDate } = { ...this.props };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck4" />
        <label className="tab-label" htmlFor="chck4">
          <img style={{ width: "40px" }} src="./redx.png" alt="" />Timestamp
          Information
        </label>
        <div className="tab-content">
          <div className="rcorners-red">
            <h5 style={{ color: "white" }}>
              The timestamp information is NOT valid
            </h5>
          </div>
          <p>iat ( The time the JWT was issued ) : {iatDate}</p>
          <p>
            nbf ( The time before which the JWT MUST NOT be accepted ) :{" "}
            {nbfDate}
          </p>
          <p>
            Issuance Date ( Date of actual issuance ) :{" "}
            {issuanceDate}
          </p>
          <p>
            Expiration Date ( Date this document expires ) :{" "}
            {expirationDate}
          </p>
        </div>
      </div>
    );
  }

  renderTabs() {
    const { expirationDate, iatDate, nbfDate, issuanceDate, verifiedVC, fileMD5, jwtMD5, signerName,
      subjectName, decodedJwt } = { ...this.props };
    if (!verifiedVC || !verifiedVC.jwt) {
      return <Fragment />;
    } else {
      const vc = verifiedVC.payload.vc;
      const imagesMatches = fileMD5 === jwtMD5 ? true : false;
      const signerVerified = signerName === "" ? false : true;
      return (
        <div>
          <div className="rcorners">
            <p>
              This document is a{" "}
              <span className="keywords">
                {vc.credentialSubject.TexasNotary.type}
              </span>{" "}
              of a{" "}
              <span className="keywords">
                {vc.credentialSubject.TexasNotary.name}.{" "}
              </span>{" "}
              The subject of this document is{" "}
              <span className="keywords">{subjectName}</span> and the
              issuer is{" "}
              <span className="keywords">{signerName}</span>. This
              document was issued at{" "}
              <span className="keywords">{iatDate}</span> and the
              issuance Date is{" "}
              <span className="keywords">{issuanceDate}</span>. This
              document is not valid until{" "}
              <span className="keywords">{nbfDate}</span>. This
              document will expire on{" "}
              <span className="keywords">{expirationDate}</span>
            </p>
          </div>

          <div className="tabs">
            <div className="tab">
              <input className="accordion-input" type="checkbox" id="chck2" />
              <label className="tab-label" htmlFor="chck2">
                <CheckboxAnimated /> Document Information
              </label>
              <div className="tab-content">
                <div className="rcorners">
                  <h5>
                    This document well formed and has all needed information
                    present.
                  </h5>
                </div>

                <p>
                  Subject: {vc.credentialSubject.id} ({subjectName})
                </p>
                <p>
                  Issuer: {vc.issuer.id} ({signerName})
                </p>
                <div style={{ textAlign: "left" }}>
                  <ReactJson
                    src={JSON.parse(decodedJwt)}
                    theme="ocean"
                  />
                </div>
              </div>
            </div>
            <div className="tab">
              {imagesMatches === true
                ? this.renderImageHashMatches()
                : this.renderImageHashDoesNotMatch()}
            </div>
            <div className="tab">
              {signerVerified === true
                ? this.renderSignerInformationValid()
                : this.renderSignerInformationNotValid()}
            </div>

            <div className="tab">
              {VerifiedCredentialUtil.timestampsAreValid(expirationDate, iatDate, nbfDate, issuanceDate) === true
                ? this.renderTimestampInformationValid()
                : this.renderTimestampInformationNotValid()}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { verifiedVC } = { ...this.props };
    return (
      <Fragment>
        {(verifiedVC && verifiedVC.jwt) && (
          <div ref={this.myRef} id="middle" className="row middle-section">
            <div className="col"></div>
            <div className="col-9 text-center">{this.renderTabs()}</div>
            <div className="col"></div>
          </div>
        )}
      </Fragment>
    );
  }
}

VerifiedDetail.propTypes = {
  expirationDate: PropTypes.string,
  iatDate: PropTypes.string,
  nbfDate: PropTypes.string,
  issuanceDate: PropTypes.string,
  verifiedVC: PropTypes.object,
  fileMD5: PropTypes.string,
  jwtMD5: PropTypes.string,
  signerDID: PropTypes.string,
  signerName: PropTypes.string,
  subjectName: PropTypes.string,
  decodedJwt: PropTypes.string
}

export default VerifiedDetail;
