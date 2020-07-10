import React, { Component, Fragment } from "react";
import ReactJson from "react-json-view";
import { ReactComponent as CheckboxAnimated } from "../img/checkbox-animated.svg";
import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import * as PropTypes from "prop-types";
import "./VerifiedDetail.scss";
import Accordion from "./common/Accordion";
import bodymovin from "lottie-web";
import loadingJson from "../img/loading.json";
import loadSuccess from "../img/loadSuccess.json";
import Tabset from "./common/Tabset";
import Tab from "./common/Tab";
import DigitalSignedGeneral from "./general-steps/DigitalSignedGeneral";
import DigitalSignedTechnical from "./technical-steps/DigitalSignedTechnical";
import CompareBlockchainGeneral from "./general-steps/CompareBlockchainGeneral";
import CompareBlockchainTechnical from "./technical-steps/CompareBlockchainTechnical";
import VerifyNotaryGeneral from "./general-steps/VerifyNotaryGeneral";
import VerifyNotaryTechnical from "./technical-steps/VerifyNotaryTechnical";
import TimeCheckGeneral from "./general-steps/TimeCheckGeneral";
import TimeCheckTechnical from "./technical-steps/TimeCheckTechnical";

class VerifiedDetail extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.setLoadingAnimations();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.verifiedVC !== this.props.verifiedVC &&
      this.props.verifiedVC &&
      this.props.verifiedVC.jwt
    ) {
      this.scrollToMyRef();
    }
  }

  async setLoadingAnimations() {
    await this.runAccordionAnimation(
      "bm-digital-signed",
      loadingJson,
      "Decrypting message..."
    );
    this.runAccordionAnimation(
      "bm-digital-signed",
      loadSuccess,
      "Document is digitally signed",
      "digital-signed"
    );
    await this.runAccordionAnimation(
      "bm-compare-blockchain",
      loadingJson,
      "Comparing image with version from blockchain..."
    );
    this.runAccordionAnimation(
      "bm-compare-blockchain",
      loadSuccess,
      "Document has not been altered",
      "compare-blockchain"
    );
    await this.runAccordionAnimation(
      "bm-verify-notary",
      loadingJson,
      "Verifying notary’s secure key from state notary list..."
    );
    this.runAccordionAnimation(
      "bm-verify-notary",
      loadSuccess,
      "Signer is a registered notary",
      "verify-notary"
    );
    const title = document.getElementById("notary");
    title.innerHTML = "Notarization is valid";
    title.style.color = "rgb(83, 170, 86)";
    await this.runAccordionAnimation(
      "bm-time-check",
      loadingJson,
      "Checking the timestamp of block registration..."
    );
    this.runAccordionAnimation(
      "bm-time-check",
      loadSuccess,
      "Notarized Document is original not a copy",
      "time-check"
    );
    await this.runAccordionAnimation(
      "bm-owner-signed",
      loadingJson,
      "Checking that the name of the owner is linked to the public key of the presentation..."
    );
    this.runAccordionAnimation(
      "bm-owner-signed",
      loadSuccess,
      "Notarized Document is signed by its owner",
      "owner-signed"
    );
    const title2 = document.getElementById("transfer");
    title2.innerHTML = "Document is transferable";
    title2.style.color = "rgb(83, 170, 86)";
  }

  runAccordionAnimation(containerId, animationData, statusText, accordionId) {
    return new Promise((resolve, reject) => {
      try {
        // change text
        const container = document.getElementById(containerId);
        const titleSpan = container.parentElement.nextSibling;
        titleSpan.innerHTML = statusText;
        // completed anim
        if (accordionId) {
          this.anim.destroy();
          const element = document.getElementById(accordionId).nextSibling;
          element.classList.add("success");
          element.classList.remove("loading");
        }
        // basic anim
        container.style.backgroundColor = "transparent";
        const animation = {
          container,
          renderer: "svg",
          loop: 0.5,
          autoplay: true,
          animationData,
        };
        this.anim = bodymovin.loadAnimation(animation);
        this.anim.setSpeed(0.4);
        this.anim.addEventListener("complete", () => resolve());
      } catch (err) {
        reject(err);
      }
    });
  }

  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

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
    const {
      expirationDate,
      iatDate,
      nbfDate,
      issuanceDate,
      didTransactionTimestamp,
    } = {
      ...this.props,
    };
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
          <p>Issuance Date ( Date of actual issuance ) : {issuanceDate}</p>
          <p>
            Expiration Date ( Date this document expires ) : {expirationDate}
          </p>
          <p>
            Blockchain Transaction Date ( Date this document metadata was stored
            into the blockchain ) : {didTransactionTimestamp}
          </p>
        </div>
      </div>
    );
  }

  renderTimestampInformationNotValid() {
    const {
      expirationDate,
      iatDate,
      nbfDate,
      issuanceDate,
      didTransactionTimestamp,
    } = {
      ...this.props,
    };
    return (
      <div>
        <input className="accordion-input" type="checkbox" id="chck4" />
        <label className="tab-label" htmlFor="chck4">
          <img style={{ width: "40px" }} src="./redx.png" alt="" />
          Timestamp Information
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
          <p>Issuance Date ( Date of actual issuance ) : {issuanceDate}</p>
          <p>
            Expiration Date ( Date this document expires ) : {expirationDate}
          </p>
          <p>
            Blockchain Transaction Date ( Date this document metadata was stored
            into the blockchain ) : {didTransactionTimestamp}
          </p>
        </div>
      </div>
    );
  }

  renderTabs() {
    const {
      expirationDate,
      iatDate,
      nbfDate,
      issuanceDate,
      verifiedVC,
      fileMD5,
      jwtMD5,
      signerName,
      subjectName,
      decodedJwt,
    } = { ...this.props };
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
                {vc.credentialSubject.TexasDigitalNotary.type}
              </span>{" "}
              of a{" "}
              <span className="keywords">
                {vc.credentialSubject.TexasDigitalNotary.name}.{" "}
              </span>{" "}
              The subject of this document is{" "}
              <span className="keywords">{subjectName}</span> and the issuer is{" "}
              <span className="keywords">{signerName}</span>. This document was
              issued at <span className="keywords">{iatDate}</span> and the
              issuance Date is <span className="keywords">{issuanceDate}</span>.
              This document is not valid until{" "}
              <span className="keywords">{nbfDate}</span>. This document will
              expire on <span className="keywords">{expirationDate}</span>
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
                  <ReactJson src={JSON.parse(decodedJwt)} theme="ocean" />
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
              {VerifiedCredentialUtil.timestampsAreValid(
                expirationDate,
                iatDate,
                nbfDate,
                issuanceDate
              ) === true
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
        <div>
          <div id="notary" className="header-2">
            Checking for valid notarization...
          </div>
          <Accordion
            id="digital-signed"
            title="Processing..."
            icon={
              <div className="bm-container">
                <div id="bm-digital-signed" className="bm" />
              </div>
            }
            labelType="loading"
            isExpanded={false}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"general"}>
                <Tab eventKey="general" title="What's happening?">
                  <DigitalSignedGeneral />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <DigitalSignedTechnical />
                </Tab>
              </Tabset>
            </div>
          </Accordion>
          <Accordion
            id="compare-blockchain"
            title="Processing..."
            icon={
              <div className="bm-container">
                <div id="bm-compare-blockchain" className="bm" />
              </div>
            }
            labelType="loading"
            isExpanded={false}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"general"}>
                <Tab eventKey="general" title="What's happening?">
                  <CompareBlockchainGeneral />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <CompareBlockchainTechnical />
                </Tab>
              </Tabset>
            </div>
          </Accordion>
          <Accordion
            id="verify-notary"
            title="Processing..."
            icon={
              <div className="bm-container">
                <div id="bm-verify-notary" className="bm" />
              </div>
            }
            labelType="loading"
            isExpanded={false}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"general"}>
                <Tab eventKey="general" title="What's happening?">
                  <VerifyNotaryGeneral />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <VerifyNotaryTechnical />
                </Tab>
              </Tabset>
            </div>
          </Accordion>
          <div id="transfer" className="header-2">
            Checking for transferability...
          </div>
          <Accordion
            id="time-check"
            title="Processing..."
            icon={
              <div className="bm-container">
                <div id="bm-time-check" className="bm" />
              </div>
            }
            labelType="loading"
            isExpanded={true}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"technical"}>
                <Tab eventKey="general" title="What's happening?">
                  <TimeCheckGeneral />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <TimeCheckTechnical />
                </Tab>
              </Tabset>
            </div>
          </Accordion>
          <Accordion
            id="owner-signed"
            title="Processing..."
            icon={
              <div className="bm-container">
                <div id="bm-owner-signed" className="bm" />
              </div>
            }
            labelType="loading"
          >
            <Fragment />
          </Accordion>
        </div>
        {verifiedVC && verifiedVC.jwt && (
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
  decodedJwt: PropTypes.string,
};

export default VerifiedDetail;
