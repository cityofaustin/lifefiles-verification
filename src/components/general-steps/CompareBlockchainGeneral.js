import React, { Component, Fragment } from "react";
import { ReactComponent as HashSvg } from "../../img/hash.svg";
import { ReactComponent as Hash2Svg } from "../../img/hash2.svg";
import { ReactComponent as HashDiagram1 } from "../../img/hash-diagram-1.svg";
import { ReactComponent as HashDiagram2 } from "../../img/hash-diagram-2.svg";
import { ReactComponent as GreenCheckSvg } from "../../img/green-check.svg";
import { ReactComponent as WarningSvg } from "../../img/warning.svg";


class CompareBlockchainGeneral extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="excerpt-1">
          A hash is string of characters that are unique to that particular
          document.
        </div>
        <div className="diagram-section-3" style={{ padding: "40px 0" }}>
          <HashSvg />
        </div>
        <div className="excerpt-1">
          A hash is obtained by putting the document through a mathematical
          algorithm that produces a unique calculation.
        </div>
        <div className="diagram-section-3" style={{ padding: "40px 0" }}>
          <Hash2Svg />
        </div>
        <div style={{ padding: "40px 0", margin: "0 -16px" }}>
          <HashDiagram1 />
        </div>
        <div className="excerpt-1" style={{ textAlign: "left" }}>
          Any changes made to the document will yield a different hash, so
          creating one allows for easy verification of any copies of this
          document.
        </div>
        <div style={{ padding: "40px 0", margin: "0 -16px" }}>
          <HashDiagram2 />
        </div>
        <div className="excerpt-1" style={{ textAlign: "left" }}>
          If any alterations have been made to the document, the calculated
          hashes won't match.
        </div>
        <div className="last-step">
          {this.props.isSuccess && <GreenCheckSvg />}
          {!this.props.isSuccess && <WarningSvg />}
          <div className={`last-excerpt ${this.props.isSuccess ? 'success' : 'warning'}`} style={{paddingLeft: '24px',textAlign: "left"}}>
            This verification step checks whether or not the document has been
            modified from its originally uploaded version on file.
          </div>
        </div>
      </div>
    );
  }
}

export default CompareBlockchainGeneral;
