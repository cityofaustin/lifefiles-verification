import React, { Component, Fragment } from "react";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import { ReactComponent as LinkSvg } from "../../img/link.svg";
import { ReactComponent as CompareSvg } from "../../img/compare.svg";
import { ReactComponent as CapitolSvg } from "../../img/capitol.svg";
import { ReactComponent as DocCheckSvg } from "../../img/doc-check.svg";
import { ReactComponent as KeySvg } from "../../img/key.svg";
import { ReactComponent as CompareWarnSvg } from "../../img/compare-warn.svg";

class OwnerSignedTechnical extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="tech-step">
          <div className="step-num">11</div>
          <div className="step-desc">
            The owner's name is resolved by entering the subject DID and the ENS
            domain into a smart contract:
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              {/* Node Hash:
              <br />
              <a
                style={{ wordBreak: "break-all" }}
                href="https://app.ens.domains/address/0x9a753f5721CF1673E06287Fe9b2166BE21E49252"
              >
                0x3442daf145b62820466398f343a5666abd6b41e9144476431b4360e0007a214e
              </a>
              <br /> */}
              {/* <br /> */}
              Subject DID:
              <br />
              {this.props.subjectDID &&
                this.props.subjectDID.split(":").length > 1 && (
                  <a
                    style={{ wordBreak: "break-all" }}
                    href={`https://etherscan.io/address/${
                      this.props.subjectDID.split(":")[2]
                    }`}
                  >
                    https://etherscan.io/address/
                    {this.props.subjectDID.split(":")[2]}
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
              ‍VC Subject Signature by: {this.props.subjectName}
            </div>
          </div>
        </div>
        {/* <div className="step-section">
          <div className="section-icon">
            <LinkSvg />
          </div>
          <div className="section-container">
            <div className="section-desc">
              Try it yourself:{" "}
              {this.props.subjectDID &&
                this.props.subjectDID.split(":").length > 1 && (
                  <a
                    style={{ wordBreak: "break-all" }}
                    href={`https://etherscan.io/address/${
                      this.props.subjectDID.split(":")[2]
                    }#readContract`}
                  >
                    https://etherscan.io/address/
                    {this.props.subjectDID.split(":")[2]}#readContract
                  </a>
                )}
            </div>
          </div>
        </div> */}
        <div className="tech-step">
          <div className="step-num">12</div>
          <div className="step-desc">
            Owner's public key is compared to the public key in the VC subject
            DID.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <KeySvg />
          </div>
          <div className="section-container">
            <div className="section-title">VC Public Key</div>
            <div className="section-desc">
              <span style={{ color: "rgb(83, 170, 86)" }}>
                {this.props.subjectDID}
              </span>
            </div>
          </div>
        </div>
        <div className="diagram-section-3" style={{ padding: "20px 0" }}>
          {this.props.isSuccess ? <CompareSvg /> : <CompareWarnSvg />}
        </div>
        <div className="step-section">
          <div className="section-icon">
            <KeySvg />
          </div>
          <div className="section-container">
            <div className="section-title">Owner's Public Key</div>
            <div className="section-desc">
              <span
                style={{
                  color: this.props.isSuccess ? "rgb(83, 170, 86)" : "#feb143",
                }}
              >
                {this.props.verifiedVP && this.props.verifiedVP.payload.iss}
              </span>
            </div>
          </div>
        </div>
        <div
          className="last-step"
          style={{
            flexDirection: "column",
            paddingTop: "20px",
            justifyContent: "center",
          }}
        >
          {this.props.isSuccess && (
            <div
              style={{
                color: "#53aa56",
                fontWeight: 600,
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              We have a match!
            </div>
          )}
          {!this.props.isSuccess && (
            <div
              style={{
                color: "#feb143",
                fontWeight: 600,
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Keys do not match
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default OwnerSignedTechnical;
