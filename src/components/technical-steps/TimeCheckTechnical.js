import React, { Component, Fragment } from "react";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import { ReactComponent as LinkSvg } from "../../img/link.svg";
import { ReactComponent as CompareSvg } from "../../img/compare.svg";
import { ReactComponent as CapitolSvg } from "../../img/capitol.svg";
import { ReactComponent as DocCheckSvg } from "../../img/doc-check.svg";
import { ReactComponent as CalendarSvg } from "../../img/calendar.svg";
import { ReactComponent as CompareWarnSvg } from "../../img/compare-warn.svg";

class TimeCheckTechnical extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="tech-step">
          <div className="step-num">9</div>
          <div className="step-desc">
            The DID is entered in ether scan to find the date of when the did
            was registered to the blockchain.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              Document DID:
              <br />
              {this.props.documentDID &&
                this.props.documentDID.split(":").length > 1 && (
                  <a
                    href={`https://etherscan.io/address/${
                      this.props.documentDID.split(":")[2]
                    }`}
                  >
                    {this.props.documentDID}
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
              ‍Registration Date: {this.props.didTransactionTimestamp}
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
              <a href="https://etherscan.io/enslookup">
                https://etherscan.io/enslookup
              </a>
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">10</div>
          <div className="step-desc">
            This date is compared to the issue date inside the VC.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <CalendarSvg />
          </div>
          <div className="section-container">
            <div className="section-title">ORIGINAL REGISTRATION DATE</div>
            <div className="section-desc">
              <span style={{ color: "rgb(83, 170, 86)" }}>
                {this.props.didTransactionTimestamp}
              </span>
            </div>
          </div>
        </div>
        <div className="diagram-section-3" style={{ padding: "20px 0" }}>
          {this.props.isSuccess ? <CompareSvg /> : <CompareWarnSvg />}
        </div>
        <div className="step-section">
          <div className="section-icon">
            <CalendarSvg />
          </div>
          <div className="section-container">
            <div className="section-title">VC ISSUANCE DATE</div>
            <div className="section-desc">
              <span
                style={{
                  color: this.props.isSuccess ? "rgb(83, 170, 86)" : "#feb143",
                }}
              >
                {this.props.issuanceDate}
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
              fontWeight: 600,
              fontSize: "20px",
              textAlign: "center",
              paddingBottom: "20px",
            }}
          >
            Is this document a verified original and not a copy?
          </div>
          {this.props.isSuccess && (
          <div
            style={{
              color: "#53aa56",
              fontWeight: 600,
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Yes, we have a match!
          </div>)}
          {!this.props.isSuccess && (
          <div
            style={{
              color: "#feb143",
              fontWeight: 600,
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Dates do not match
          </div>)}
        </div>
      </div>
    );
  }
}

export default TimeCheckTechnical;
