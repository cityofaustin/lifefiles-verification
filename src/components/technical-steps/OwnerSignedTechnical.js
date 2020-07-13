import React, { Component, Fragment } from "react";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import { ReactComponent as LinkSvg } from "../../img/link.svg";
import { ReactComponent as CompareSvg } from "../../img/compare.svg";
import { ReactComponent as CapitolSvg } from "../../img/capitol.svg";
import { ReactComponent as DocCheckSvg } from "../../img/doc-check.svg";
import { ReactComponent as KeySvg } from "../../img/key.svg";

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
              Node Hash:
              <br />
              <a
                style={{ wordBreak: "break-all" }}
                href="https://app.ens.domains/address/0x9a753f5721CF1673E06287Fe9b2166BE21E49252"
              >
                0x3442daf145b62820466398f343a5666abd6b41e9144476431b4360e0007a214e
              </a>
              <br />
              <br />
              Subject DID:
              <br />
              did:ethr:0x2a6F1D5083fb19b9f2C653B598abCb5705eD0439
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
              ‍VC Subject Signature by: Billy Case Worker
            </div>
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <LinkSvg />
          </div>
          <div className="section-container">
            <div className="section-desc">
              Try it yourself:{" "}
              <a
                style={{ wordBreak: "break-all" }}
                href="https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41#readContract"
              >
                https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41#readContract
              </a>
            </div>
          </div>
        </div>
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
                did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027
              </span>
            </div>
          </div>
        </div>
        <div className="diagram-section-3" style={{ padding: "20px 0" }}>
          <CompareSvg />
        </div>
        <div className="step-section">
          <div className="section-icon">
            <KeySvg />
          </div>
          <div className="section-container">
            <div className="section-title">Owner's Public Key</div>
            <div className="section-desc">
              <span style={{ color: "rgb(83, 170, 86)" }}>
                did:ethr:0x6efedeaec20e79071251fffa655F1bdDCa65c027
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
        </div>
      </div>
    );
  }
}

export default OwnerSignedTechnical;
