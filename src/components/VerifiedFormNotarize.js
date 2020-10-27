import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { ReactComponent as UploadSvg } from "../img/upload-drop.svg";
import { ReactComponent as DocumentSvg } from "../img/document.svg";
import PdfPreview from "./PdfPreview";
import * as PropTypes from "prop-types";
import "./VerifiedFormNotarize.scss";
import stateSeal from "../img/state-seal.png";
import notarizedCheck from "../img/notarized-check.svg";
import bodymovin from "lottie-web";
import documentLoadingJson from "../img/document-loading.json";
import Accordion from "./common/Accordion";

import "./NotarizePageComponents/NotarizePageComponents.scss";

class VerifiedFormNotarize extends Component {
  state = {
    did: "",
    pdfLink: undefined,
    displayHowTo: false,
    documentAccordionExpanded: true,
  };

  anim = undefined;

  componentDidMount() {
    // this.setLoadingAnimations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading && this.props.isLoading) {
      // this.setLoadingAnimations();
      this.setState({ documentAccordionExpanded: false });
    }
  }

  // setLoadingAnimations() {
  //   const animData = {
  //     container: document.getElementById("bm-doc-loading"),
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: documentLoadingJson,
  //   };

  //   this.anim = bodymovin.loadAnimation(animData);
  //   this.anim.setSpeed(0.2);
  // }

  handleDidChange = (e) => {
    this.setState({ did: e.target.value });
  };

  handleOnDrop = async (files) => {
    const { handleOnDrop } = { ...this.props };
    files = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    handleOnDrop(files[0]);
    this.setState({ pdfLink: files[0].preview });
  };

  renderFileUploadContainer() {
    const { pdfLink } = { ...this.state };
    return (
      <Dropzone onDrop={this.handleOnDrop}>
        {({ getRootProps, getInputProps }) => (
          <Fragment>
            <section className="dropzone-container">
              {!pdfLink && this.renderFileUpload(getRootProps, getInputProps)}
              {/* {pdfLink && <PdfPreview fileURL={pdfLink} />} */}
              {/* <div>{pdfLink && <img src={pdfLink} />}</div>
               */}
              {pdfLink &&
                this.renderUploadedFile(getRootProps, getInputProps, pdfLink)}
            </section>
          </Fragment>
        )}
      </Dropzone>
    );
  }

  renderFileUpload(getRootProps, getInputProps) {
    return (
      <div {...getRootProps()} className="dropzone-form">
        <input {...getInputProps()} />
        <svg className="dash-rect">
          <g
            fill="#fff"
            stroke="#707070"
            strokeWidth="2"
            strokeDasharray="10 15"
            opacity="0.6"
          >
            <rect className="one" width="100%" height="374" stroke="none" />
            <rect className="two" x="1" y="1" fill="none" />
          </g>
        </svg>
        <div className="upload">
          <div className="caption">Upload your file by dropping it here...</div>
          <UploadSvg />
        </div>
      </div>
    );
  }

  renderUploadedFile(getRootProps, getInputProps, pdfLink) {
    return (
      <div {...getRootProps()} className="dropzone-form">
        <div className="upload">
          <div className="caption">
            {" "}
            <img style={{ width: "300px" }} src={pdfLink}></img>
          </div>
          {/* <UploadSvg /> */}
        </div>
      </div>
    );
  }

  render() {
    const { did, pdfLink, documentAccordionExpanded } = { ...this.state };
    const { handleFileSubmit, isLoading } = { ...this.props };
    return (
      <div id="top" className="form-section">
        <img
          src={stateSeal}
          width="250"
          height="250"
          alt=""
          className="image sealimg"
        />
        <h4>
          Texas Digital Notarization
          <img
            style={{ marginLeft: "20px" }}
            className="notarized-check-img"
            src={notarizedCheck}
            width="50"
            height="50"
            alt=""
          />
        </h4>

        <div style={{ width: 960 }}>
          <Accordion
            id="checkDoc"
            title="Document"
            icon={<DocumentSvg />}
            isExpanded={documentAccordionExpanded}
            setExpanded={(isExpanded) =>
              this.setState({ documentAccordionExpanded: isExpanded })
            }
          >
            <Fragment>{this.renderFileUploadContainer()}</Fragment>
          </Accordion>
        </div>
      </div>
    );
  }
}

VerifiedFormNotarize.propTypes = {
  handleOnDrop: PropTypes.func,
  handleFileSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default VerifiedFormNotarize;
