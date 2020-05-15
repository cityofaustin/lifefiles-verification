import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import { Button, FormGroup, Input, Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader } from "reactstrap";
import { ReactComponent as UploadSvg } from "../img/upload-drop.svg";
import { ReactComponent as InfoSvg } from '../img/info.svg';
import PdfPreview from "./PdfPreview";
import * as PropTypes from 'prop-types';
import './VerifiedForm.scss';
import stateSeal from '../img/state-seal.png';
import bodymovin from 'lottie-web';
import documentLoadingJson from '../img/document-loading.json';

class VerifiedForm extends Component {
  state = {
    did: "did:ethr:0x27dFC5414aa6Ca1515411392581e71af2Ef0B921",
    pdfLink: undefined,
    displayHowTo: false
  }

  anim = undefined;

  componentDidMount() {
    this.setLoadingAnimations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading && this.props.isLoading) {
      this.setLoadingAnimations();
    }
  }

  setLoadingAnimations() {
    const animData = {
      container: document.getElementById('bm-doc-loading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: documentLoadingJson
    };

    this.anim = bodymovin.loadAnimation(animData);
    this.anim.setSpeed(0.2);
  }

  handleDidChange = (e) => {
    this.setState({ did: e.target.value });
  };

  handleOnDrop = async (files) => {
    const { handleOnDrop } = { ...this.props };
    files = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
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
          <section className="dropzone-container">
            {!pdfLink && this.renderFileUpload(getRootProps, getInputProps)}
            {pdfLink && <PdfPreview fileURL={pdfLink} />}
          </section>
        )}
      </Dropzone>
    );
  }

  renderFileUpload(getRootProps, getInputProps) {
    return (
      <div {...getRootProps()} className="dropzone-form">
        <input {...getInputProps()} />
        <svg className="dash-rect">
          <g fill="#fff" stroke="#707070" strokeWidth="2" strokeDasharray="10 15" opacity="0.6">
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

  toggleHowTo = () => {
    const {displayHowTo} = {...this.state};
    this.setState({displayHowTo: !displayHowTo})
  }

  renderHowTo() {
    const {displayHowTo} = {...this.state};
    return (
      <Modal
        isOpen={displayHowTo}
        toggle={this.toggleHowTo}
        backdrop={'static'}
        size={'xl'}
      >
        <ModalHeader toggle={this.toggleHowTo}>
        </ModalHeader>
        <ModalBody>
          <p>A Decentralized Identifier (DID) is a globally unique number in a blockchain that allows for secure and private identity verification.</p>
          <p>A DID is created when a file is packaged, digitally notarized and uploaded to a blockchain.</p>
          <p>These chains of randomly ordered blocks of information form a ledger that exists in thousands of devices and any changes to the file can be identified by comparing it to its original.</p>
        </ModalBody>
        <ModalFooter>
          <button>Next</button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    const { did, pdfLink } = { ...this.state };
    const { handleFileSubmit, isLoading } = { ...this.props };
    return (
      <div id="top" className="form-section">
        {this.renderHowTo()}
        <img src={stateSeal} width="400" height="400" alt="" className="image" />
        <h1>Texas Digital Notary Verification</h1>
        <FormGroup>
          <Label htmlFor="documentTypeSelected" className="prompt">
            What is the DID for this document?
          </Label>
          <div className="did-input-section">
            <Input
              type="text"
              name="didInput"
              id="didInput"
              value={did}
              onChange={this.handleDidChange}
              placeholder="Please enter the DID of the document you wish to verify..."
            />
            <InfoSvg onClick={() => this.setState({displayHowTo: true})} />
          </div>
        </FormGroup>
        {isLoading && (
          <div className="doc-loading-container">
            <div id="bm-doc-loading" />
          </div>
        )}
        {!isLoading && (
          <Fragment>
            {this.renderFileUploadContainer()}
            <div className="submit-section">
              <Button
                className="margin-wide"
                color="primary"
                disabled={!pdfLink}
                onClick={() => handleFileSubmit(did)}
              >
                Submit
            </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

VerifiedForm.propTypes = {
  handleOnDrop: PropTypes.func,
  handleFileSubmit: PropTypes.func,
  isLoading: PropTypes.bool
}

export default VerifiedForm;
