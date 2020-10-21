import React, { Component, Fragment } from "react";
import { ReactComponent as DocumentSvg } from "../../img/notarize-signature-info.svg";
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

import "./NotarizePageComponents.scss";

class NotarySignature extends Component {
  state = {
    documentTitle: "",
  };

  componentDidMount() {}

  handleDocumentTitleChange = (e) => {
    this.setState({ documentTitle: e.target.value });
  };

  renderDocumentTitle = () => {
    return (
      <Container>
        <Row>
          <Col>
            <div
              className="notarization-checkboxes"
              style={{ paddingLeft: "50px" }}
            >
              <Input style={{ zoom: 2 }} type="checkbox" />
              <p>I accept the use of digital signatures</p>
              <Input style={{ zoom: 2 }} type="checkbox" />
              <p>
                I affirm that the scanned document is true, exact, complete, and
                unaltered copy made by me. And this document was presented to me
                by the document's custodian, and that to the best of my
                knowledge, the scanned document is neither public record nor a
                publically recordable document
              </p>
              <Input style={{ zoom: 2 }} type="checkbox" />
              <p>I accept the following as my digital signature</p>
            </div>
            <br></br>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="text-center">
              <Input
                className="custodian-name"
                type="text"
                name="didInput"
                id="didInput"
                value={this.state.documentTitle}
                onChange={this.handleDocumentTitleChange}
                placeholder="Notary Name"
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    return (
      <Accordion
        id="checkDoc"
        title="Notary Signature"
        icon={<DocumentSvg />}
        isExpanded={true}
      >
        <Fragment>{this.renderDocumentTitle()}</Fragment>
      </Accordion>
    );
  }
}

export default NotarySignature;
