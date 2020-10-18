import React, { Component, Fragment } from "react";
import { ReactComponent as DocumentSvg } from "../../img/document.svg";
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

class CustodianInformation extends Component {
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
            <Label className="notarize-headers">Document Custodian Name</Label>
            <Input
              type="text"
              name="custodianFullname"
              onChange={this.props.onInfoChanged}
              placeholder="What is the document custodian's name?"
            />
          </Col>

          <Col>
            <Label className="notarize-headers">Document Custodian Email</Label>
            <Input
              type="text"
              name="custodianEmail"
              onChange={this.props.onInfoChanged}
              placeholder="What is the document custodian's email?"
            />
            <p>{this.props.custodianMessage}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label className="notarize-headers">
              Document Custodian Digital Signature
            </Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="checkbox" /> I accept the use of digital signatures
            <br></br>
            <Input type="checkbox" /> I affirm that the scanned document is
            true, exact, complete, and unaltered copy of the original document
            in my possession
            <br></br>
            <Input type="checkbox" /> I accept the following as my digital
            signature
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
                placeholder="Custodian Name"
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
        title="Document Custodian Information and Signature"
        icon={<DocumentSvg />}
        isExpanded={true}
      >
        <Fragment>{this.renderDocumentTitle()}</Fragment>
      </Accordion>
    );
  }
}

export default CustodianInformation;
