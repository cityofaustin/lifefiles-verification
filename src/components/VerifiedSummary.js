import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import VerifiedCredentialUtil from "../util/VerifiedCredentialUtil";
import "./VerifiedSummary.scss";
import { ReactComponent as KeySvg } from "../img/key1.svg";
import { ReactComponent as CalendarSvg } from "../img/calendar2.svg";
import { ReactComponent as ClockSvg } from "../img/clock.svg";

class VerifiedSummary extends Component {
  render() {
    const {
      signerName,
      subjectName,
      didTransactionTimestamp,
      issuanceDate,
      expirationDate,
      isSuccess,
    } = { ...this.props };

    // const imagesMatches = fileMD5 && fileMD5 === jwtMD5 ? true : false;
    // const signerVerified = !signerName || signerName === "" ? false : true;
    // const validtimestamps = VerifiedCredentialUtil.timestampsAreValid(
    //   expirationDate,
    //   iatDate,
    //   nbfDate,
    //   issuanceDate
    // );
    // let validStamp =
    //   imagesMatches && signerVerified && validtimestamps ? true : false;
    const missing = "[Missing]";
    return (
      <div className="summary-container">
        <div className="summary">
          <div className="section certified">
            <div className="img">
              <KeySvg />
            </div>
            <div>
              This document is {!isSuccess && "not "}a{" "}
              <span className={isSuccess ? "success" : "warning"}>
                Certified Copy
              </span>
              {/* of a <span className="success">Passport</span> */}. The
              subject of this document is{" "}
              <span className="general">
                {subjectName ? subjectName : missing}
              </span>{" "}
              and the issuer is{" "}
              <span className="info">{signerName ? signerName : missing}</span>.
            </div>
          </div>
          <div className="section registered">
            <div className="img">
              <CalendarSvg />
            </div>
            <div>
              This document was registered on{" "}
              <span className="success">{didTransactionTimestamp ? didTransactionTimestamp : missing}</span> and
              issued on{" "}
              <span className={isSuccess ? "success" : "warning"}>
                {issuanceDate ? issuanceDate : missing}
              </span>
              .
            </div>
          </div>
          <div className="section valid">
            <div className="img">
              <ClockSvg />
            </div>
            <div>
              This document is not valid until{" "}
              <span className="info">{issuanceDate ? issuanceDate : missing}</span>.
            </div>
            <div className="expire">
              This document will expire on{" "}
              <span className="danger">{expirationDate ? expirationDate : missing}</span>.
            </div>
          </div>
        </div>
      </div>
    );
    // if (!verifiedVC || !verifiedVC.jwt) {
    //   return <Fragment />;
    // } else if (validStamp) {
    //   return (
    //     <div id="bottom" className="row bottom-section">
    //       <div className="col"></div>
    //       <div className="col-9 text-center">
    //         <div>
    //           <div>
    //             <img width="300px" src="./approved.png" alt="" />
    //           </div>

    //           <div className="alert alert-success" role="alert">
    //             <h4 className="alert-heading">This Document Is Verified!</h4>
    //             <p>
    //               This document has passed all verification steps and is a certified
    //               authentic document.
    //             </p>
    //             <hr />
    //             <p className="mb-0"></p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col"></div>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div id="bottom" className="row bottom-section">
    //       <div className="col"></div>
    //       <div className="col-9 text-center">
    //         <div>
    //           <div className="alert alert-danger" role="alert">
    //             <h4 className="alert-heading">This Document Is Not Valid!!</h4>
    //             <p>This document has not passed all verification steps.</p>
    //             <hr />
    //             <p className="mb-0"></p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col"></div>
    //     </div>
    //   );
    // }
  }
}

VerifiedSummary.propTypes = {
  fileMD5: PropTypes.string,
  jwtMD5: PropTypes.string,
  signerName: PropTypes.string,
  verifiedVC: PropTypes.object,
  expirationDate: PropTypes.string,
  iatDate: PropTypes.string,
  nbfDate: PropTypes.string,
  issuanceDate: PropTypes.string,
};

export default VerifiedSummary;
