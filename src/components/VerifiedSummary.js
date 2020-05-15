import React, { Component, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import VerifiedCredentialUtil from '../util/VerifiedCredentialUtil';
import './VerifiedSummary.scss';

class VerifiedSummary extends Component {

  render() {
    const { fileMD5, jwtMD5, signerName, verifiedVC, expirationDate, iatDate, nbfDate, issuanceDate } = { ...this.props };

    const imagesMatches = (fileMD5 && fileMD5 === jwtMD5) ? true : false;
    const signerVerified = (!signerName || signerName === "") ? false : true;
    const validtimestamps = VerifiedCredentialUtil.timestampsAreValid(expirationDate, iatDate, nbfDate, issuanceDate);
    let validStamp = (imagesMatches && signerVerified && validtimestamps) ? true : false;

    if (!verifiedVC || !verifiedVC.jwt) {
      return <Fragment />;
    } else if (validStamp) {
      return (
        <div id="bottom" className="row bottom-section">
          <div className="col"></div>
          <div className="col-9 text-center">
            <div>
              <div>
                <img width="300px" src="./approved.png" alt="" />
              </div>

              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">This Document Is Verified!</h4>
                <p>
                  This document has passed all verification steps and is a certified
                  authentic document.
                </p>
                <hr />
                <p className="mb-0"></p>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      );
    } else {
      return (
        <div id="bottom" className="row bottom-section">
          <div className="col"></div>
          <div className="col-9 text-center">
            <div>
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">This Document Is Not Valid!!</h4>
                <p>This document has not passed all verification steps.</p>
                <hr />
                <p className="mb-0"></p>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      );
    }
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
  issuanceDate: PropTypes.string
};

export default VerifiedSummary;
