import React, { Component } from "react";
import { ReactComponent as BlockchainDiagram1Svg } from "../../img/blockchain-diagram-1.svg";
import { ReactComponent as BlockchainDiagram2Svg } from "../../img/blockchain-diagram-2.svg";
import { ReactComponent as BlockchainSvg } from "../../img/blockchain.svg";
import { ReactComponent as DidSvg } from "../../img/did.svg";
import { ReactComponent as DocumentCopyDiagramSvg } from "../../img/document-copy-diagram.svg";
import { ReactComponent as GreenCheckSvg } from "../../img/green-check.svg";
import { ReactComponent as WarningSvg } from "../../img/warning.svg";
import "./TimeCheckGeneral.scss";

class TimeCheckGeneral extends Component {
  render() {
    return (
      <div className="tab--content time-check-gen">
        <div className="section-1">
          To determine whether the document is the original digitally notarized
          file, we need to use an address to find it in the blockchain.
        </div>
        <div className="section-2">
          <BlockchainDiagram1Svg />
          <div className="right-section">
            <p>
              A blockchain is a recordable data network that is linked across
              multiple devices.
            </p>
            <p>
              Blockchains are immutable by nature, which means once information
              is recorded, it cannot be modified.
            </p>
          </div>
        </div>
        <div className="section-3">
          <BlockchainDiagram2Svg />
        </div>
        <div className="section-4">
          The same blockchain exists in multiple devices and functions as a
          self-verifying network, where if one device's copy of the blockchain
          doesn't match the rest, it is rejected by the system.
        </div>
        <div className="section-5">
          <BlockchainSvg />
          <div className="tip">Where's Bob's document?</div>
        </div>
        <div className="section-6">
          So how do we find Bob's document in this long blockchain?
        </div>
        <div className="section-7">
          That's where <strong>decentralized identifiers (DID)</strong> come in.
          They link to the document through a unique URL and make it searchable.
        </div>
        <div className="section-8">
          <DidSvg />
        </div>
        <div className="section-9">
          Once we find Bob's document on the blockchain with its DID address, we
          can find out when that document was originally registered.
        </div>
        <div className="section-10">
          <DocumentCopyDiagramSvg />
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

export default TimeCheckGeneral;
