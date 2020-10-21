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

import "./NotarizePageComponents.scss";

class DocumentInformation extends Component {
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
            <Label className="notarize-headers">Document Title</Label>
            <Input
              type="text"
              name="documentType"
              onChange={this.props.onInfoChanged}
              placeholder="What is the name of this document?"
              value={this.props.values && this.props.values.documentType}
            />
          </Col>

          <Col></Col>
        </Row>
      </Container>
    );
  };

  render() {
    return (
      <Accordion
        id="checkDoc"
        title="Document Information"
        icon={<DocumentSvg />}
        isExpanded={true}
      >
        <Fragment>{this.renderDocumentTitle()}</Fragment>
      </Accordion>
    );
  }
}

export default DocumentInformation;
