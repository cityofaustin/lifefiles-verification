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
import FileBase64 from "react-file-base64";

class NotaryInformation extends Component {
  state = {
    documentTitle: "",
  };

  componentDidMount() {}

  renderDocumentTitle = () => {
    return (
      <Container>
        <Row>
          <Col>
            <Label className="notarize-headers">Notary Name</Label>
            <Input
              type="text"
              name="notaryFullname"
              onChange={this.props.onInfoChanged}
              placeholder="Who is the notary?"
            />
          </Col>

          <Col>
            <Label className="notarize-headers">Notary ID</Label>
            <Input
              type="text"
              name="notaryId"
              onChange={this.props.onInfoChanged}
              placeholder="What your notary ID?"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label className="notarize-headers">County</Label>
            <Input
              type="text"
              name="county"
              onChange={this.props.onInfoChanged}
              placeholder="What county are you notarizing this in?"
            />
          </Col>

          <Col>
            <Label className="notarize-headers">
              Notary DID Private ETH Key
            </Label>
            <Input
              type="text"
              name="notaryEthPrivateKey"
              value={this.props.notaryEthPrivateKey}
              onChange={this.props.onInfoChanged}
              placeholder="What is your private Ethereum key for signing"
            />
          </Col>
        </Row>

        <Row>
          <Col xs="4">
            <Label className="notarize-headers">Notarial Seal</Label>
            <FileBase64 />
          </Col>

          <Col xs="4">
            <Label className="notarize-headers">Notarial Seal</Label>
            <FileBase64 />
          </Col>

          <Col xs="4">
            <div className="text-center">
              <p style={{ color: "#ff0000", textAlign: "center" }}>
                If you don't have a DID you can enter your email below to
                receive one
              </p>
              <Input
                type="text"
                name="notaryEmail"
                onChange={this.props.onInfoChanged}
                placeholder="What is your email?"
              />
              <Button
                onClick={this.props.generateEmailDid}
                style={{ minWidth: 50, height: 42 }}
              >
                Get DID
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center" style={{ color: "blue", fontSize: 10 }}>
              *Your PEM key is used to cryptographically sign and encrypt the
              document locally on your device, it is not uploaded to the
              internet
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    return (
      <Accordion
        id="checkDoc"
        title="Notary Information"
        icon={<DocumentSvg />}
        isExpanded={true}
      >
        <Fragment>{this.renderDocumentTitle()}</Fragment>
      </Accordion>
    );
  }
}

export default NotaryInformation;
