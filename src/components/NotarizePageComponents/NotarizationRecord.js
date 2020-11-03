import React, { Component, Fragment } from "react";
import { ReactComponent as DocumentSvg } from "../../img/notarize-record-info.svg";
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

class NotarizationRecord extends Component {
  state = {
    network: "s3",
  };

  componentDidMount() {}

  handleDocumentTitleChange = (e) => {
    this.setState({ documentTitle: e.target.value });
  };

  handleNetworkChange = (e) => {
    console.log(e.target);
    this.setState({ network: e.target.id });
    this.props.onNetworkChanged(e);
  };

  renderDocumentTitle = () => {
    return (
      <Container>
        <Row>
          <Col>
            <p>
              In order for the digital notarization to be transferable to
              document custodian, a record of the notarial act needs to be
              stored on a public ledger. For this step, you will need to choose
              which ledger you would like to use, and the record will be
              automatically uploaded there. The different options have different
              costs (listed below). If you select an option that requires a
              cryptocurrency fee, you will need a cryptocurrency wallet to pay.
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Label className="notarize-headers">Select a ledger</Label>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input
                    onClick={this.handleNetworkChange}
                    defaultChecked
                    id="s3"
                    type="radio"
                    name="radio1"
                  />{" "}
                  Amazon S3 - $0.00
                </Label>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input
                    onClick={this.handleNetworkChange}
                    id="testnet"
                    type="radio"
                    name="radio1"
                  />{" "}
                  Ethereum Testnet - $0.00
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onClick={this.handleNetworkChange}
                    id="blockchain"
                    type="radio"
                    name="radio1"
                  />{" "}
                  Ethereum Blockchain - $50.00
                </Label>
              </FormGroup>
            </FormGroup>
            {this.state.network !== "s3" && (
              <Input
                onChange={this.props.onInfoChanged}
                id="ethFundingPrivateKey"
                type="text"
                name="ethFundingPrivateKey"
                placeholder="Funding Ethereum Private Key"
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  };

  render() {
    return (
      <Accordion
        id="checkDoc"
        title="Notary Record"
        icon={<DocumentSvg />}
        isExpanded={true}
      >
        <Fragment>{this.renderDocumentTitle()}</Fragment>
      </Accordion>
    );
  }
}

export default NotarizationRecord;
