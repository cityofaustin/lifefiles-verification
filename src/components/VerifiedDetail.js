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
import loadWarning from "../img/loadWarning.json";
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
import OwnerSignedGeneral from "./general-steps/OwnerSignedGeneral";
import OwnerSignedTechnical from "./technical-steps/OwnerSignedTechnical";
import { parse, isSameDay } from "date-fns";

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
      // this.scrollToMyRef();
    }
  }

  async setLoadingAnimations() {
    const { handleSuccessFail } = { ...this.props };
    await this.runAccordionAnimation(
      "bm-digital-signed",
      loadingJson,
      "Decrypting message..."
    );
    const isSuccessDigitalSigned = handleSuccessFail("digital-signed");
    this.runAccordionAnimation(
      "bm-digital-signed",
      isSuccessDigitalSigned ? loadSuccess : loadWarning,
      isSuccessDigitalSigned
        ? "Document is digitally signed"
        : "Digital signatures are missing",
      "digital-signed"
    );
    await this.runAccordionAnimation(
      "bm-compare-blockchain",
      loadingJson,
      "Comparing image with version from blockchain..."
    );
    const isSuccessCompareBlockchain = handleSuccessFail("compare-blockchain");
    this.runAccordionAnimation(
      "bm-compare-blockchain",
      isSuccessCompareBlockchain ? loadSuccess : loadWarning,
      isSuccessCompareBlockchain
        ? "Document has not been altered"
        : "Document has been altered",
      "compare-blockchain"
    );
    await this.runAccordionAnimation(
      "bm-verify-notary",
      loadingJson,
      "Verifying notary’s secure key from state notary list..."
    );
    const isSuccessVerifyNotary = handleSuccessFail("verify-notary");
    this.runAccordionAnimation(
      "bm-verify-notary",
      isSuccessVerifyNotary ? loadSuccess : loadWarning,
      isSuccessVerifyNotary
        ? "Signer is a registered notary"
        : "Signer is not a registered notary",
      "verify-notary"
    );
    const title = document.getElementById("notary");
    title.innerHTML =
      isSuccessDigitalSigned &&
      isSuccessCompareBlockchain &&
      isSuccessVerifyNotary
        ? "Notarization is valid"
        : "Notarization is invalid";
    title.style.color =
      isSuccessDigitalSigned &&
      isSuccessCompareBlockchain &&
      isSuccessVerifyNotary
        ? "rgb(83, 170, 86)"
        : "rgb(254, 177, 67)";
    await this.runAccordionAnimation(
      "bm-time-check",
      loadingJson,
      "Checking the timestamp of block registration..."
    );
    const isSuccessTimeCheck = handleSuccessFail("time-check");
    this.runAccordionAnimation(
      "bm-time-check",
      isSuccessTimeCheck ? loadSuccess : loadWarning,
      isSuccessTimeCheck
        ? "Notarized Document is original not a copy"
        : "Notarized document is a copy not an original",
      "time-check"
    );
    await this.runAccordionAnimation(
      "bm-owner-signed",
      loadingJson,
      "Checking that the name of the owner is linked to the public key of the presentation..."
    );
    const isSuccessOwnerSigned = handleSuccessFail("owner-signed");
    this.runAccordionAnimation(
      "bm-owner-signed",
      isSuccessOwnerSigned ? loadSuccess : loadWarning,
      isSuccessOwnerSigned
        ? "Notarized Document is signed by its owner"
        : "Notarized document is not signed by its owner",
      "owner-signed"
    );
    const title2 = document.getElementById("transfer");
    title2.innerHTML =
      isSuccessTimeCheck && isSuccessOwnerSigned
        ? "Document is transferable"
        : "Document is not transferable";
    title2.style.color =
      isSuccessTimeCheck && isSuccessOwnerSigned
        ? "rgb(83, 170, 86)"
        : "rgb(254, 177, 67)";
    this.props.setDone();
  }

  runAccordionAnimation = (
    containerId,
    animationData,
    statusText,
    accordionId
  ) => {
    const { handleSuccessFail } = { ...this.props };
    return new Promise((resolve, reject) => {
      try {
        // change text
        const container = document.getElementById(containerId);
        const titleSpan = container.parentElement.nextSibling;
        titleSpan.innerHTML = statusText;
        // completed anim
        if (accordionId) {
          this.anim.destroy();
          const isSuccess = handleSuccessFail(accordionId);
          const accordionLabelEl = document.getElementById(accordionId)
            .nextSibling;
          const accordionContentEl = accordionLabelEl.nextSibling;
          const tabContainerEl = accordionContentEl.firstElementChild;
          const tabsEl = tabContainerEl.firstElementChild.firstElementChild;
          if (isSuccess) {
            tabsEl.classList.add("success");
            accordionLabelEl.classList.add("success");
          } else {
            tabsEl.classList.add("warning");
            accordionLabelEl.classList.add("warning");
          }
          accordionLabelEl.classList.remove("loading");
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
        this.anim.setSpeed(0.3);
        this.anim.addEventListener("complete", () => resolve());
      } catch (err) {
        reject(err);
      }
    });
  };

  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

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
      base64,
      fileMD5,
      signerDID,
      signerName,
      issuanceDate,
      didTransactionTimestamp,
      subjectDID,
      signerId,
      notaryInfo,

      expirationDate,
      iatDate,
      nbfDate,
      subjectName,
      decodedJwt,
      handleSuccessFail,
    } = { ...this.props };
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
                  <DigitalSignedGeneral
                    isSuccess={handleSuccessFail("digital-signed")}
                  />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <DigitalSignedTechnical
                    documentDID={documentDID}
                    vpJwt={vpJwt}
                    ownerPublicKey={ownerPublicKey}
                    verifiedVP={verifiedVP}
                    verifiedVC={verifiedVC}
                    notaryX509PublicKey={notaryX509PublicKey}
                    signedMd5={signedMd5}
                    jwtMD5={jwtMD5}
                  />
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
                  <CompareBlockchainGeneral
                    isSuccess={handleSuccessFail("compare-blockchain")}
                  />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <CompareBlockchainTechnical
                    base64={base64}
                    fileMD5={fileMD5}
                    jwtMD5={jwtMD5}
                    isSuccess={handleSuccessFail("compare-blockchain")}
                  />
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
                  <VerifyNotaryTechnical
                    notaryX509PublicKey={notaryX509PublicKey}
                    signerDID={signerDID}
                    signerName={signerName}
                    signerId={signerId}
                    notaryInfo={notaryInfo}
                  />
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
            isExpanded={false}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"general"}>
                <Tab eventKey="general" title="What's happening?">
                  <TimeCheckGeneral
                    isSuccess={handleSuccessFail("time-check")}
                  />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <TimeCheckTechnical
                    documentDID={documentDID}
                    didTransactionTimestamp={didTransactionTimestamp}
                    issuanceDate={issuanceDate}
                    isSuccess={handleSuccessFail("time-check")}
                  />
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
            isExpanded={false}
          >
            <div className="tab-container">
              <Tabset defaultActiveKey={"general"}>
                <Tab eventKey="general" title="What's happening?">
                  <OwnerSignedGeneral
                    isSuccess={handleSuccessFail("owner-signed")}
                  />
                </Tab>
                <Tab eventKey="technical" title="Technical Steps">
                  <OwnerSignedTechnical
                    subjectDID={subjectDID}
                    subjectName={subjectName}
                    verifiedVP={verifiedVP}
                    subjectDID={subjectDID}
                    isSuccess={handleSuccessFail("owner-signed")}
                  />
                </Tab>
              </Tabset>
            </div>
          </Accordion>
        </div>
        {/* {verifiedVC && verifiedVC.jwt && (
          <div ref={this.myRef} id="middle" className="row middle-section">
            <div className="col"></div>
            <div className="col-9 text-center">{this.renderTabs()}</div>
            <div className="col"></div>
          </div>
        )} */}
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
