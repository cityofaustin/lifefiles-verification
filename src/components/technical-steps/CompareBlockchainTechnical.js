import React, { Component, Fragment } from "react";
import { ReactComponent as InputSvg } from "../../img/input.svg";
import { ReactComponent as OutputSvg } from "../../img/output.svg";
import { ReactComponent as Output2Svg } from "../../img/output2.svg";
import { ReactComponent as LinkSvg } from "../../img/link.svg";
import { ReactComponent as CompareSvg } from "../../img/compare.svg";
import { ReactComponent as CompareWarnSvg } from "../../img/compare-warn.svg";

class CompareBlockchainTechnical extends Component {
  render() {
    return (
      <div className="tab--content">
        <div className="tech-step">
          <div className="step-num">3</div>
          <div className="step-desc">
            The uploaded document image is turned into base64.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container">
            <div className="section-title">input</div>
            <div className="section-desc">
              Document Image File (Scroll to the top for a preview of it)
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
              Base64 Code:
              <br />
              {this.props.base64 && this.props.base64.substring(0, 40)}...
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
              <a href="https://base64.guru/converter/encode/pdf">
                https://base64.guru/converter/encode/pdf
              </a>
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">4</div>
          <div className="step-desc">
            The base64 code is then calculated into a hash string.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <InputSvg />
          </div>
          <div className="section-container" style={{ width: "100%" }}>
            <div className="section-title">input</div>
            <div className="section-desc">
              Base64 Code:
              <br />
              {/* FIXME: need to figure out a way of making this not blocking */}
              {/* <textarea
                readOnly
                value={this.props.base64}
                rows="6"
                style={{ width: "100%" }}
              /> */}
              {this.props.base64 && this.props.base64.substring(0, 40)}...
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
              Hash String: {this.props.fileMD5}
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
              <a href="https://passwordsgenerator.net/md5-hash-generator/">
                https://passwordsgenerator.net/md5-hash-generator/
              </a>
            </div>
          </div>
        </div>
        <div className="tech-step">
          <div className="step-num">5</div>
          <div className="step-desc">
            This hash string is then compared to the original hash string
            decrypted using the Notary's PEM Key (Step 2). If both strings are
            exactly the same, that means the document hasn't been altered in any
            way.
          </div>
        </div>
        <div className="step-section">
          <div className="section-icon">
            <Output2Svg />
          </div>
          <div className="section-container">
            <div className="section-title">original</div>
            <div className="section-desc">
              Decrypted Hash String:
              <br />
              <span style={{ color: "rgb(83, 170, 86)" }}>
                {this.props.jwtMD5}
              </span>
            </div>
          </div>
        </div>
        <div className="diagram-section-3" style={{ padding: "20px 0" }}>
          {this.props.isSuccess ? <CompareSvg /> : <CompareWarnSvg />}
        </div>
        <div className="step-section">
          <div className="section-icon">
            <Output2Svg />
          </div>
          <div className="section-container">
            <div className="section-title">verifiable image</div>
            <div className="section-desc">
              Hash String:
              <br />
              <span style={{ color: this.props.isSuccess ? "rgb(83, 170, 86)" : "#feb143" }}>
                {this.props.fileMD5}
              </span>
            </div>
          </div>
        </div>
        <div
          className="last-step"
          style={{ paddingTop: "20px", justifyContent: "center" }}
        >
          {this.props.isSuccess && (
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
          )}
          {!this.props.isSuccess && (
            <div
              style={{
                color: "#feb143",
                fontWeight: 600,
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Hashes do not match
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CompareBlockchainTechnical;

const base64 = {
  base64:
    "JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA4NDEuODkgNTk1LjI4XQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAxNjA2Cj4+CnN0cmVhbQowLjI3IHcKMCBHCnEKMjE4LjE4IDAgMCAxNTcuMzMgMjk3LjYwIDQxOS4yOCBjbQovSTAgRG8KUQpCVAovRjEgMzAgVGYKNTQuMDAgVEwKMCBnCjg1LjMzIDM4NS45NSBUZAooQ2VydGlmaWVkIENvcHkgb2YgYSBOb24tUmVjb3JkYWJsZSBEb2N1bWVudCkgVGoKRVQKQlQKL0YxIDI0IFRmCjQzLjIwIFRMCjAgZwo4NS4zMyAzMzYuNjEgVGQKKFN0YXRlIG9mIFRleGFzKSBUagpFVApCVAovRjkgMTMuNzk5OTk5OTk5OTk5OTk5IFRmCjI0Ljg0IFRMCjAgZwo4NS4zMyAzMDEuOTUgVGQKKENvdW50eSBvZiAgICAgICAgIFRyYXZpcyAgICAgICAgIC4pIFRqClQqIChPbiB0aGlzIGRhdGUsICBKdW4gMDIsIDIwMjAgICwgSSBjZXJ0aWZ5IHRoYXQgdGhlIHByZWNlZGluZyBvZiBhdHRhY2hlZCBkb2N1bWVudCwgaXMgYSB0cnVlLCBleGFjdCwgY29tcGxldGUsIGFuZCB1bmFsdGVyZWQgY29weSkgVGoKVCogKG1hZGUgYnkgbWUgb2YgICAgQmlydGggQ2VydGlmaWNhdGUgICApIFRqCkVUCkJUCi9GOSAxMy43OTk5OTk5OTk5OTk5OTkgVGYKMjQuODQgVEwKMCBnCjMxMi4wMCAyNTIuNjEgVGQKKCwgcHJlc2VudGVkIHRvIG1lIGJ5IHRoZSBkb2N1bWVudJJzIGN1c3RvZGlhbiwgICAgICAgICAgICAgICAgICAgIFNhbGx5IE93bmVyICAgICAgICAgICAgICAgICAgICAsKSBUagpFVApCVAovRjkgMTMuNzk5OTk5OTk5OTk5OTk5IFRmCjI0Ljg0IFRMCjAgZwo4NS4zMyAyMjcuOTUgVGQKKGFuZCB0aGF0LCB0byB0aGUgYmVzdCBvZiBteSBrbm93bGVkZ2UsIHRoZSBwaG90b2NvcGllZCBkb2N1bWVudCBpcyBuZWl0aGVyIGEgcHVibGljIHJlY29yZCBub3QgYSBwdWJsaWNseSByZWNvcmRhYmxlKSBUagpUKiAoZG9jdW1lbnQsIGNlcnRpZmllZCBjb3BpZXMgb2Ygd2hpY2ggYXJlIGF2YWlsYWJsZSBmcm9tIGFuIG9mZmljaWFsIHNvdXJjZSBvdGhlciB0aGFuIGEgbm90YXJ5LikgVGoKRVQKMC42NyB3CjE0NS4zMzMgMjk5LjI4MCBtIAoyMzguNjY3IDI5OS4yODAgbApTCjE1OC42NjcgMjc0LjYxMyBtIAoyMzguNjY3IDI3NC42MTMgbApTCjE3Mi4wMDAgMjQ5Ljk0NyBtIAozMDUuMzMzIDI0OS45NDcgbApTCjU3Ni4wMDAgMjQ5Ljk0NyBtIAo3NzIuMDAwIDI0OS45NDcgbApTCnEKMTE1LjM3IDAgMCA0Mi4wMCA4NS4zMyAxMzcuMjggY20KL0kxIERvClEKODUuMzMzIDEyOC42MTMgbSAKMjEzLjMzMyAxMjguNjEzIGwKUwpCVAovRjkgMTUgVGYKMjcuMDAgVEwKMCBnCjg1LjMzIDEwOS45NSBUZAooTm90YXJ5IFNlYWwpIFRqCkVUCkJUCi9GMTUgMjQgVGYKNDMuMjAgVEwKMCBnCjM4NC4wMCAxNTEuMjggVGQKPDAwMTMwMTE2MDEyYjAxMmIwMTdjMDAwMzAwMTQwMGRjMDE1NDAwZjcwMTc2MDEzYTAxNGQwMTI3MDBmNzAxNGQ+IFRqCkVUCjM4NC4wMDAgMTI4LjYxMyBtIAo1MTIuMDAwIDEyOC42MTMgbApTCkJUCi9GMSAxMy43OTk5OTk5OTk5OTk5OTkgVGYKMjQuODQgVEwKMCBnCjM4NC4wMCAxMDkuOTUgVGQKKFwoU2lnbmF0dXJlIG9mIG5vdGFyeVwpKSBUagpFVApCVAovRjEgMjQgVGYKNDMuMjAgVEwKMCBnCjg1LjMzIDQ3Ljk1IFRkCihkaWQ6ZXRocjoweDg1NzRiMjZlNGZlYzJmOTE0ODNmNTNBMmMxN0UwMGZlZjJGMkUyMWQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjggMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9i",
};
