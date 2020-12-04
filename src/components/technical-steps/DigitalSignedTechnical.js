import React, { Component } from "react";
import "./DigitalSignedTechnical.scss";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import ReactJson from "react-json-view";

class DigitalSignedTechnical extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="tech-step">
          <div className="step-num">1</div>
          <div className="step-desc">
            Retrieve the information stored on the blockchain at the{" "}
            <a href="https://www.w3.org/TR/did-core/">
              De-centralized Identified address (DID)
            </a>{" "}
            and resolve it to obtain the first JWT payload.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              DID Address:{" "}
              <a
                href={`https://uniresolver.io/1.0/identifiers/${this.props.documentDID}`}
              >
                {this.props.documentDID}
              </a>
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              Public Keys:
              <br />
              <a style={{wordBreak: "break-all"}}
                href={`https://uniresolver.io/1.0/identifiers/${this.props.ownerPublicKey}`}
              >
                {this.props.ownerPublicKey}
              </a>
              <br />
              JWT Payload:
              <br />
              <a href={`https://jwt.io?access_token=${this.props.vpJwt}`}>
                {this.props.vpJwt && this.props.vpJwt.substring(0, 40)}...
              </a>
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">1a</div>
          <div className="step-desc">
            The first JWT is decoded with the holders ETH public key obtain the
            VP (
            <a href="https://www.w3.org/TR/vc-data-model/#presentations">
              Verifiable Presentation
            </a>
            ) payload signed with the owner's public key.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              JWT Payload:
              <br />
              <a href={`https://jwt.io?access_token=${this.props.vpJwt}`}>
                {this.props.vpJwt && this.props.vpJwt.substring(0, 40)}...
              </a>
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              {this.props.verifiedVP && (
                <ReactJson
                  src={this.props.verifiedVP.payload}
                  theme="rjv-default"
                  indentWidth={2}
                  collapseStringsAfterLength={28}
                  displayObjectSize={false}
                  displayDataTypes={false}
                />
              )}
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">1b</div>
          <div className="step-desc">
            That second JWT in the VP is then decoded with the owner's public
            key to obtain a VC (
            <a href="https://www.w3.org/TR/vc-data-model/#credentials">
              Verifiable Credential
            </a>
            ) payload.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              JWT Payload:
              <br />
              {this.props.verifiedVP && (
                <a
                  href={`https://jwt.io?access_token=${this.props.verifiedVP.payload.vp.verifiableCredential[0]}`}
                >
                  {this.props.verifiedVP.payload.vp.verifiableCredential[0].substring(
                    0,
                    40
                  )}
                  ...
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <OutputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">
              {this.props.verifiedVC && this.props.verifiedVC.payload && (
                <ReactJson
                  src={this.props.verifiedVC.payload}
                  theme="rjv-default"
                  indentWidth={2}
                  collapseStringsAfterLength={28}
                  displayObjectSize={false}
                  displayDataTypes={false}
                />
              )}
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">2</div>
          <div className="step-desc">
            The Notary’s PGP key is retrieved from the VC and used to decrypt
            the signed Hash string to get the MD5 hash of the document image.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc" style={{ wordBreak: "break-all" }}>
              Notary PEM Public Key:
              <br />
              {this.props.notaryX509PublicKey &&
                this.props.notaryX509PublicKey}
              <br />
              Signed hash:
              <br />
              {this.props.signedMd5}
              <br />
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <Output2Svg />
          </div>
          <div className="section-container">
            <div className="section-title">output</div>
            <div className="section-desc">MD5 hash: {this.props.jwtMD5}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalSignedTechnical;
