import React, { Fragment, Component } from "react";
import "./VerifyNotaryGeneral.scss";
import { ReactComponent as DigitalSigSvg } from "../../img/digital-sig.svg";
import { ReactComponent as PemDiagram1Svg } from "../../img/pem-diagram-1.svg";
import { ReactComponent as PemSvg } from "../../img/pem.svg";
import { ReactComponent as EnsDomainSvg } from "../../img/ens-domain.svg";
import { ReactComponent as GreenCheckSvg } from "../../img/green-check.svg";
import { ReactComponent as ExclaimGreySvg } from "../../img/exclaim-grey.svg";

class VerifyNotaryGeneral extends Component {
  render() {
    return (
      <div className="tab--content verify-notary-gen">
        <div className="section-1">
          <DigitalSigSvg />
          <div className="excerpt-1">
            In order to make sure a digitally notarized document is legal,
            notaries are verified with their digital signature.
          </div>
        </div>
        <div className="section-2">
          <PemDiagram1Svg />
        </div>
        <div className="section-3">
          <PemSvg />
          <div className="excerpt-1">
            Since Julia signed the notarized document with her PEM public key,
            we can use it to compare it to the secretary of state website and
            see if it matches her credentials.
          </div>
        </div>
        <div className="section-4">
          <EnsDomainSvg />
          <div className="excerpt-1">
            Additionally, it's worth mentioning that this same verification
            model can be applied to a variety of use cases that go beyond
            document notarization. This is because the verification credentials
            it pulls come from an ENS domain that can come from any organization
            that wishes to make verifiable claims.
          </div>
        </div>
        <div className="last-step">
          <GreenCheckSvg />
          <div
            className="last-excerpt"
            style={{ paddingLeft: "24px", textAlign: "left" }}
          >
            This verification step checks whether or not the notary signer is an
            officially licensed notary in the state of Texas.
          </div>
        </div>
        <div className="last-step" style={{padding: "0 0 40px 0"}}>
          <ExclaimGreySvg />
          <div
            className="last-excerpt"
            style={{ paddingLeft: "24px", textAlign: "left", color: "#888888" }}
          >
            At this point, if the document passes all first three verification
            steps, the document is a valid digitally notarized copy.
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyNotaryGeneral;
