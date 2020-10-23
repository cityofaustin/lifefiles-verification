import React, { Component } from "react";
import { ReactComponent as DocumentSvg } from "../img/document.svg";
import question from "../img/question.svg";
import stateSeal from "../img/state-seal.png";
import notarizedCheck from "../img/checkmark-white.svg";
import {
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Card,
  Button,
  CardTitle,
  CardText,
  Col,
} from "reactstrap";
class ChooseToolPage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="app-container">
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <img
            src={stateSeal}
            width="250"
            height="250"
            alt=""
            className="image"
          />
          <h1 style={{ fontFamily: "Segoe UI" }}>
            Texas Digital Notarization Tool
          </h1>
          <h3 style={{ fontFamily: "Segoe UI" }}>What would you like to do?</h3>
        </div>

        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <Container>
            <Row>
              <Col>
                <a href="notarize">
                  <Card style={{ backgroundColor: "#327495" }} body inverse>
                    <CardTitle>
                      <img
                        src={notarizedCheck}
                        width="75"
                        height="75"
                        alt=""
                        className="image"
                      />
                    </CardTitle>
                    <CardText>
                      <p
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        Digitally notarize a document
                      </p>
                    </CardText>
                  </Card>
                </a>
              </Col>
              <Col>
                <a href="verify">
                  <Card body inverse color="success">
                    <CardTitle>
                      <img
                        src={question}
                        width="75"
                        height="75"
                        alt=""
                        className="image"
                      />
                    </CardTitle>
                    <CardText>
                      <p
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        Verify a digitally notarized document
                      </p>
                    </CardText>
                  </Card>
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default ChooseToolPage;
