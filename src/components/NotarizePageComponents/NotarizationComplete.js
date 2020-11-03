import React, { Component, Fragment } from "react";
import { ReactComponent as DocumentSvg } from "../../img/notarize-doc-info.svg";
import Accordion from "../common/Accordion";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
} from "reactstrap";

import stateSeal from "../../img/state-seal.png";
import notarizedCheck from "../../img/notarized-check.svg";
import PdfPreview from "../PdfPreview";

import "./NotarizePageComponents.scss";

class NotarizationComplete extends Component {
  state = {
    documentTitle: "",
  };

  componentDidMount() {}

  renderDocumentTitle = () => {
    return (
      <div id="top" className="form-section">
        <img
          src={stateSeal}
          width="250"
          height="250"
          alt=""
          className="image sealimg"
        />
        <h4>
          Texas Digital Notarization
          <img
            style={{ marginLeft: "20px" }}
            className="notarized-check-img"
            src={notarizedCheck}
            width="50"
            height="50"
            alt=""
          />
        </h4>

        <div style={{ width: 960 }}></div>
      </div>
    );
  };

  printPdf = () => {
    window.print();
  };

  render() {
    let documentDid;

    console.log(this.props.vcJwtLink);

    if (
      this.props.vcJwtLink !== undefined &&
      this.props.vcJwtLink.includes("did%3Aweb") == true
    ) {
      documentDid = "did:web:" + this.props.vcJwtLink;
    }

    return (
      <div>
        <div id="top" className="form-section">
          <img
            src={stateSeal}
            width="250"
            height="250"
            alt=""
            className="image sealimg"
          />
          <h4>
            Notarization Completed
            <img
              style={{ marginLeft: "20px" }}
              className="notarized-check-img"
              src={notarizedCheck}
              width="50"
              height="50"
              alt=""
            />
          </h4>
          <p style={{ fontSize: "22px" }}>
            A verifiable credential recording of the notarization has been
            registered to the ledger at the following address:
          </p>
          <p>{documentDid}</p>
          <a href={this.props.vcJwtLink}> Link to VC on Selected Ledger </a>

          <div style={{ width: 960 }}></div>
        </div>

        <Container>
          <Row>
            <Col>
              <div style={{ width: 260 }}>
                {this.props.base64Pdf && (
                  <PdfPreview fileURL={this.props.base64Pdf} />
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button className="notarization-complete-btn">
                Email To Document Custodian
              </Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button
                onClick={this.printPdf}
                className="notarization-complete-btn"
              >
                Print
              </Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button
                onClick={this.props.savePdf}
                className="notarization-complete-btn"
              >
                Download
              </Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Button
                onClick={() => window.location.reload(false)}
                className="notarization-complete-btn"
              >
                Notarize Another Document
              </Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <a href="/verify">
                Click here to verify the validity of this notarized document
              </a>
            </Col>
          </Row>
          {/* Click here to verify the validity of this notarized document */}
        </Container>
      </div>
    );
  }
}

export default NotarizationComplete;
