import React, { Component } from "react";
import { ReactComponent as NotaryKeySvg } from "../../img/notary-key.svg";
import { ReactComponent as OwnerKeySvg } from "../../img/owner-key.svg";
import { ReactComponent as KeysSvg } from "../../img/keys.svg";
import { ReactComponent as Stamp1Svg } from "../../img/stamp1.svg";
import { ReactComponent as Stamp2Svg } from "../../img/stamp2.svg";
import { ReactComponent as Stamp3Svg } from "../../img/stamp3.svg";
import { ReactComponent as Stamp4Svg } from "../../img/stamp4.svg";
import { ReactComponent as Stamp5Svg } from "../../img/stamp5.svg";
import "./DigitalSignedGeneral.scss";

class DigitalSignedGeneral extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="exerpt-1">
          In the cryptographic world, there are two types of keys:{" "}
          <strong>private and public</strong>. Both keys can be used to encrypt
          and decrypt documents. Every user has at least one of each.
        </div>
        <div className="diagram-section-1">
          <NotaryKeySvg />
          <OwnerKeySvg />
        </div>
        <KeysSvg />
        <div className="exerpt-2">
          In this case, when a document is notarized, it is first signed and
          encrypted with the Notary's PEM private key (their digital notarial
          certification), then again with their ETH private key (their link to
          the blockchain), and lastly by the owner of the document.
        </div>
        <div className="diagram-section-2">
          <div className="half">
            <Stamp1Svg />
            <div className="stamp-exerpt" style={{paddingTop: '20px'}}>
              Julia stamps, seals and notarizes a physical copy of Bob's
              document.
            </div>
          </div>
          <div className="half">
            <Stamp2Svg />
            <div className="stamp-exerpt">
              Once notarized, Julia scans the file and uploads it.
            </div>
          </div>
        </div>
        <div className="diagram-section-2">
          <Stamp3Svg />
          <Stamp4Svg />
        </div>
        <Stamp5Svg />
      </div>
    );
  }
}

export default DigitalSignedGeneral;
