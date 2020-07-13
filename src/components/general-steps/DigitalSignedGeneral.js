import React, { Component } from "react";
import { ReactComponent as NotaryKeySvg } from "../../img/notary-key.svg";
import { ReactComponent as OwnerKeySvg } from "../../img/owner-key.svg";
import { ReactComponent as KeysSvg } from "../../img/keys.svg";
import { ReactComponent as Stamp1Svg } from "../../img/stamp1.svg";
import { ReactComponent as Stamp2Svg } from "../../img/stamp2.svg";
import { ReactComponent as Stamp3Svg } from "../../img/stamp3.svg";
import { ReactComponent as Stamp4Svg } from "../../img/stamp4.svg";
import { ReactComponent as Stamp5Svg } from "../../img/stamp5.svg";
import { ReactComponent as HashWhatSvg } from "../../img/hash-what.svg";
import { ReactComponent as GreenCheckSvg } from "../../img/green-check.svg";
import { ReactComponent as WarningSvg } from "../../img/warning.svg";
import "./DigitalSignedGeneral.scss";

class DigitalSignedGeneral extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="excerpt-1">
          In the cryptographic world, there are two types of keys:{" "}
          <strong>private and public</strong>. Both keys can be used to encrypt
          and decrypt documents. Every user has at least one of each.
        </div>
        <div className="diagram-section-1">
          <NotaryKeySvg />
          <OwnerKeySvg />
        </div>
        <KeysSvg />
        <div className="excerpt-2">
          In this case, when a document is notarized, it is first signed and
          encrypted with the Notary's PEM private key (their digital notarial
          certification), then again with their ETH private key (their link to
          the blockchain), and lastly by the owner of the document.
        </div>
        <div className="diagram-section-2">
          <div className="half">
            <Stamp1Svg />
            <div className="stamp-excerpt" style={{ paddingTop: "20px" }}>
              Julia stamps, seals and notarizes a physical copy of Bob's
              document.
            </div>
          </div>
          <div className="half">
            <Stamp2Svg />
            <div className="stamp-excerpt">
              Once notarized, Julia scans the file and uploads it.
            </div>
          </div>
        </div>
        <div className="diagram-section-2" style={{ padding: "40px 0" }}>
          <div className="half">
            <Stamp3Svg />
            <div className="stamp-excerpt">
              When uploading Bob's document, Julia encrypts and signs the hash
              with her Notarial credentials.
            </div>
          </div>
          <div className="half">
            <Stamp4Svg />
            <div className="stamp-excerpt">
              Hash is then wrapped in a VC (Verifiable Credential) which is also
              signed and encrypted with their private key.
            </div>
          </div>
        </div>
        <div className="diagram-section-3" style={{ paddingBottom: "40px" }}>
          <Stamp5Svg />
          <div className="stamp-excerpt">
            Lastly, Bob claims the document as his, at which point the entire VC
            is encrypted and signed by its rightful owner Bob.
          </div>
        </div>
        <div className="diagram-section-3">
          <HashWhatSvg />
          <div className="stamp-excerpt">
            What's a hash? See step two below for an explanation.
          </div>
        </div>
        <div className="last-step">
          {this.props.isSuccess && <GreenCheckSvg />}
          {!this.props.isSuccess && <WarningSvg />}
          <div className={`last-excerpt ${this.props.isSuccess ? 'success' : 'warning'}`}>
            This verification step checks to see whether or not the document has
            been properly signed and encrypted and to retrieve the hash of the
            document.
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalSignedGeneral;
