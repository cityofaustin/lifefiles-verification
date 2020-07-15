import React, { Component } from "react";
import { ReactComponent as OwnerSignedSvg } from "../../img/owner-signed.svg";
import { ReactComponent as OwnerNotSignedSvg } from "../../img/owner-not-signed.svg";
import { ReactComponent as GreenCheckSvg } from "../../img/green-check.svg";
import { ReactComponent as WarningSvg } from "../../img/warning.svg";

class OwnerSignedGeneral extends Component {
  render() {
    return (
      <div className="tab--content owner-signed-gen">
        <div className="section-1" style={{ paddingBottom: "20px" }}>
          To determine whether the document is the original digitally notarized
          file, we need to use an address to find it in the blockchain.
        </div>
        <div className="section-2" style={{ padding: "20px 0 0 0" }}>
          <OwnerSignedSvg />
        </div>
        <div
          className="section-3"
          style={{
            padding: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="half" style={{ width: "50%" }}>
            When Bob claims the document as his. the entire VC is encrypted and
            signed by its rightful owner Bob.
          </div>
        </div>
        <div className="section-4" style={{ padding: "20px 0 0 0" }}>
          <OwnerNotSignedSvg />
        </div>
        <div
          className="section-5"
          style={{
            padding: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="half" style={{ width: "50%" }}>
            If Bob fails to claim the notarized document, then it is not
            transfearable because it lacks its owner's signature.
          </div>
        </div>
        <div className="section-6" style={{ padding: "20px 0" }}>
          For a full breakdown of how encryption keys and signatures work,
          please see step one.
        </div>
        <div className="last-step">
          {this.props.isSuccess && <GreenCheckSvg />}
          {!this.props.isSuccess && <WarningSvg />}
          <div
            className={`last-excerpt ${
              this.props.isSuccess ? "success" : "warning"
            }`}
            style={{ paddingLeft: "24px", textAlign: "left" }}
          >
            This verification step checks whether or not the document is the
            original digitally notarized file or a non-transfearable copy.
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerSignedGeneral;
