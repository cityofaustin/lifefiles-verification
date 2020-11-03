import React, { Component, Fragment } from "react";
import NotaryUtil from "../util/NotaryUtil";
import PdfPreview from "./PdfPreview";
import VerifiedFormNotarize from "./VerifiedFormNotarize";
import DocumentInformation from "./NotarizePageComponents/DocumentInformation";
import NotaryInformation from "./NotarizePageComponents/NotaryInformation";
import CustodianInformation from "./NotarizePageComponents/CustodianInformation";
import NotarySignature from "./NotarizePageComponents/NotarySignature";
import NotarizationRecord from "./NotarizePageComponents/NotarizationRecord";
import axios from "axios";
import { Button } from "reactstrap";
import ip from "ip";
import EthCrypto from "eth-crypto";
import NotarizationComplete from "./NotarizePageComponents/NotarizationComplete";
import EthereumBlockchainService from "../services/blockchain/EthereumBlockchainService";
import NodeRSA from "node-rsa";

let DOMAIN = "http://3.129.87.17:5004";

// const ipAddress = ip.address(); // my ip address

// if (ipAddress === "127.0.0.1") {
//   DOMAIN = "http://localhost:5004";
// }

if (
  window.location.host.includes("localhost") ||
  window.location.host.includes("127.0.0.1")
) {
  DOMAIN = "http://localhost:5004";
}

// const S3_JWT_BUCKET_URL =
//   "https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aethr%3A";
const S3_JWT_BUCKET_URL =
  "https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aweb%3A";
const API_GATEWAY_UPLOAD_REQUEST_URL =
  "https://h80bdb0zm6.execute-api.us-east-1.amazonaws.com/uploads";
const GENERATE_EMAIL_TO_DID_URL = `${DOMAIN}/api/generate-email-did`;
const GET_TXT_RECORD_URL = `${DOMAIN}/api/get-txt-record/`;
const GENERATE_DOCUMENT_DID_URL = `${DOMAIN}/api/generate-document-did`;
const STORE_JWT_TO_ETH_BLOCKCHAIN = `${DOMAIN}/api/store-jwt`;

// api gateway for this - "https://7b19eg6lz6.execute-api.us-east-2.amazonaws.com/prod"

class NotarizePage extends Component {
  state = {
    imageBase64: undefined,
    notaryDigitalSealBase64: undefined,
    vc: undefined,
    notaryType: undefined,
    expirationDate: undefined,
    notaryId: undefined,
    documentDidAddress: undefined,
    notaryEmail: undefined,
    notaryEthAddress: undefined,
    notaryEthPrivateKey: undefined,
    notaryPemPublicKey: undefined,
    notaryPemPrivateKey: undefined,
    custodianEthAddress: undefined,
    documentType: undefined,
    custodianFullname: undefined,
    custodianEmail: undefined,
    notaryFullname: undefined,
    loading: true,
    base64Pdf: undefined,
    isLoading: false,
    vcJwtLink: undefined,
    uniresolverLink: undefined,
    network: "s3",
    custodianMessage: "",
    ethFundingPrivateKey: "",
  };

  async componentDidMount() {
    // TODO: Have fields for these:
    this.setState({ notaryType: "certifiedCopy" });
    this.setState({ expirationDate: new Date("2030-1-1") });
    // this.setTestData();
  }

  setTestData = async () => {
    // START For debugging
    this.setState({
      imageBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnklEQVR42u3RAQ0AAAQAMAqorJCQapj9FZ411cEZKUQIQoQgRAhChCBEiBAhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQgRAhChCBECEKEIAQhQhAiBCFCECIEIQgRghAhCBGCECEIESJECEKEIEQIQr5bryyAId6SZokAAAAASUVORK5CYII=",
    });
    this.setState({
      notaryDigitalSealBase64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAoUlEQVR42u3RMQ0AMAgAsCFoGpHKhw5sENJaaHT9fKwRQoQgRAhChCBECEKECBGCECEIEYIQIQgRghCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQIUKEIEQIQoQg5LoBTwr0iRuuiJwAAAAASUVORK5CYII=",
    });

    this.setState({ notaryId: 12345 });
    this.setState({
      notaryEthAddress: "0x8540cb6900d9E941e328aC49cf13e207088669eD",
    });
    this.setState({
      notaryEthPrivateKey:
        "061fe9cc7053ecd3fdf4747d53ea904c18faef2e35b78a774da94172e8c29f9e",
    });

    // this.setState({
    //   notaryPemPublicKey:
    //     "-----BEGIN PUBLIC KEY-----\n" +
    //     "MIGJAoGBAJxgZCDrhIhZPOgGKt3LaAA1/hVwlsPotX5csgDPFxifKpR75ta2Ye1V\n" +
    //     "/yYcrL8YXi5G4RoGvT0S3nnIg5aBbNQXXGiFYS+mXaQAgGCpagvEaZAKi7ZHF1OY\n" +
    //     "AlK/AZ9WZhsd8uq9eh1lj3/izecOPOV3teTQfsFFOnrJqh+FijfPAgMBAAE=\n" +
    //     "-----END PUBLIC KEY-----",
    // });

    let tstzero =
      "-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAJxgZCDrhIhZPOgGKt3LaAA1/hVwlsPotX5csgDPFxifKpR75ta2Ye1V\n/yYcrL8YXi5G4RoGvT0S3nnIg5aBbNQXXGiFYS+mXaQAgGCpagvEaZAKi7ZHF1OY\nAlK/AZ9WZhsd8uq9eh1lj3/izecOPOV3teTQfsFFOnrJqh+FijfPAgMBAAE=\n-----END RSA PUBLIC KEY-----";

    // let tster =
    //   "-----BEGIN RSA PUBLIC KEY-----MIGJAoGBAJxgZCDrhIhZPOgGKt3LaAA1/hVwlsPotX5csgDPFxifKpR75ta2Ye1V/yYcrL8YXi5G4RoGvT0S3nnIg5aBbNQXXGiFYS+mXaQAgGCpagvEaZAKi7ZHF1OYAlK/AZ9WZhsd8uq9eh1lj3/izecOPOV3teTQfsFFOnrJqh+FijfPAgMBAAE=-----END RSA PUBLIC KEY-----";

    // const pubKey = new NodeRSA();
    // pubKey.importKey(tstzero, "pkcs1-public-pem");

    this.setState({
      notaryPemPublicKey: tstzero,
    });

    this.setState({
      notaryPemPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIICXQIBAAKBgQCcYGQg64SIWTzoBirdy2gANf4VcJbD6LV+XLIAzxcYnyqUe+bW\n" +
        "tmHtVf8mHKy/GF4uRuEaBr09Et55yIOWgWzUF1xohWEvpl2kAIBgqWoLxGmQCou2\n" +
        "RxdTmAJSvwGfVmYbHfLqvXodZY9/4s3nDjzld7Xk0H7BRTp6yaofhYo3zwIDAQAB\n" +
        "AoGAHFn1jWpl6vqS6lZD61Z3kqI3YNe63eYREcnok/D39QTWiXk1TvReKNOQoO5N\n" +
        "+4+Fc8pyAW/7W1lScK4D/YOVoU3I9jYlyhQipw86W3BvXM+ChEqsEKcpuDZ3+kBd\n" +
        "/8+rwdiYdm5uOERf8GMQK8G2NJ+0T+Frdg0HuQaauqBX2TECQQDPq3eAdjlCO3zg\n" +
        "ur80nL3ZPLXDndzsDCbP72OzYINzC/sGn09HLjEjvqrsCkfKJcmrkbegoWFRkq3p\n" +
        "oKs+6IfrAkEAwMT6hK5JTHYGKZvyqiFu3S9xPXwP1ql1malYyCT2MOyOkTj/lb0Q\n" +
        "LoG+nxs1DPp9RRNsXP6b4ULAi1OWFCmarQJBAIiKgs4R7V/g4SCZaLJdBG5a/l+Z\n" +
        "4fHJo5NAINuF76erDuexw1xXwLNx38vGjqEY61pFOukAco5B1Nsxaqa4GPUCQF67\n" +
        "rt2rhQwVaFvkbrHbMk9ytDTiFiqJJuj4B1B8kZxjdIC7wScGPcCNNG+egEi7hPqA\n" +
        "XB2rZlGia1tNHZEVDRUCQQDIpyoIA9CV5Z1skcUpkGDoukBCTJInNY8UUy+aWpaH\n" +
        "kaBL9TuBdLgv4L2MilzK/uW6Kkyg6E7B/V2QmMIafS/P\n" +
        "-----END RSA PRIVATE KEY-----",
    });

    // Owner Eth Private Key - de6d012651648be75ea4d1738563e014a0b2ea2366c748accffbd4f09f373b10
    this.setState({
      custodianEthAddress: "0x5F0808b631FC76B82098dd0E4dDCf569130374Bf",
    });

    this.setState({ documentType: "Passport" });
    this.setState({ custodianFullname: "Custodian Custodian" });
    this.setState({ notaryFullname: "Notary Notary" });

    // Document Did Priavate Key - 85b33218262e2a46129c8e451231171b13c91bf93f2219425c21e501ea491b58
    // this.setState({
    //   documentDidAddress: "0xeb885e57d3b38d3954fd1653e861584eb0eb2078",
    // });

    let newDid = await EthereumBlockchainService.createNewDID();

    console.log({ newDid });

    this.setState({
      documentDidAddress: newDid.didAddress,
    });

    this.setState({ custodianEmail: "custodian@custodian.com" });
    this.setState({ county: "Travis" });
    // END For debugging

    await this.setState({ loading: false });
  };

  generateEmailToDid = async (email, custodian = false) => {
    let result = await axios.post(GENERATE_EMAIL_TO_DID_URL, {
      email: email,
      custodian: custodian,
    });
    return result.data;
  };

  generateEmailDid = async () => {
    let email = this.state.notaryEmail;
    const did = await this.generateEmailToDid(email);

    this.setState({ notaryEthAddress: did.didAddress });
    this.setState({ notaryEthPrivateKey: did.didPrivateKey });
  };

  generateVC = async () => {
    console.log("Starting VC");
    let custodianEmail = this.state.custodianEmail;
    let custodianDid;
    let emailTxtRecord = await axios.get(GET_TXT_RECORD_URL + custodianEmail);

    if (emailTxtRecord.data == undefined || emailTxtRecord.data == "") {
      const genDid = await this.generateEmailToDid(custodianEmail, true);
      custodianDid = genDid.didAddress;
    } else {
      custodianDid = emailTxtRecord.data;
    }

    await this.setState({ custodianEthAddress: custodianDid });

    let docDidRes = await axios.get(GENERATE_DOCUMENT_DID_URL);

    await this.setState({ documentDidAddress: docDidRes.data.didAddress });

    const {
      notaryType,
      expirationDate,
      notaryId,
      documentDidAddress,
      notaryEthAddress,
      notaryEthPrivateKey,
      notaryPemPublicKey,
      notaryPemPrivateKey,
      custodianEthAddress,
      imageBase64,
      notaryDigitalSealBase64,
      documentType,
      custodianFullname,
      notaryFullname,
      county,
      ethFundingPrivateKey,
      network,
    } = { ...this.state };

    let vc = await NotaryUtil.createNotarizedDocument(
      notaryType,
      expirationDate,
      notaryId,
      documentDidAddress,
      notaryEthAddress,
      notaryEthPrivateKey,
      notaryPemPublicKey,
      notaryPemPrivateKey,
      custodianEthAddress,
      imageBase64,
      notaryDigitalSealBase64,
      documentType,
      custodianFullname,
      notaryFullname,
      county,
      network
    );

    console.log({ vc });

    await this.setState({ vc });

    const base64Pdf = vc.doc.output("datauristring");
    this.setState({ base64Pdf });

    let uniresolverLink;
    let vcJwtLink;

    if (network === "s3") {
      await this.uploadVCToS3(documentDidAddress);
      // vcJwtLink = S3_JWT_BUCKET_URL + documentDidAddress + ".json";
      // https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aweb%3A0xd54a349B70142879A0c6e0d54B7580BA81F4DB48.json
      vcJwtLink = S3_JWT_BUCKET_URL + documentDidAddress + ".json";
    }
    if (network === "testnet" || this.state.network === "blockchain") {
      let didUrl;
      let resolverUrl;
      const vcJwt = this.state.vc.vc;

      const ethClient = new EthereumBlockchainService(
        network,
        ethFundingPrivateKey
      );
      const vcUnpacked = await ethClient.verifyVC(vcJwt);

      const documentDidAddress = vcUnpacked.payload.vc.id.split(":")[2];
      if (network === "testnet") {
        didUrl = "https://ropsten.etherscan.io/address/" + documentDidAddress;
        resolverUrl =
          "https://dev.uniresolver.io/1.0/identifiers/did%3Aethr%3Aropsten%3A" +
          documentDidAddress;
      }
      if (network === "blockchain") {
        didUrl = "https://etherscan.io/address/" + documentDidAddress;
        resolverUrl =
          "https://dev.uniresolver.io/1.0/identifiers/did%3Aethr%3A" +
          documentDidAddress;
      }
      vcJwtLink = didUrl;
      uniresolverLink = resolverUrl;
      const expirationDate = new Date(vcUnpacked.payload.vc.expirationDate);
      const now = new Date();
      const validityTimeSeconds = Math.round((expirationDate - now) / 1000);
      const documentDidPrivateKey = docDidRes.data.didPrivateKey;
      // mainnet vs testnet are from the .env infura provider.
      ethClient.storeDataOnEthereumBlockchain(
        documentDidAddress,
        documentDidPrivateKey,
        validityTimeSeconds,
        vcJwt
      );
    }
    this.setState({ vcJwtLink, uniresolverLink });
  };

  uploadVCToS3 = async (documentDid) => {
    //https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aweb%3A0xE3854B41Ae72Ef164279C457dAA65E82984C201b.json
    const res = await axios.get(API_GATEWAY_UPLOAD_REQUEST_URL, {
      headers: {
        did: documentDid,
      },
    });

    let now = Math.round(Date.now() / 1000);
    let vcToUpload = { vcJwt: this.state.vc.vc, timestamp: now };
    let uploadRes = await axios.put(res.data.uploadURL, vcToUpload, {
      headers: { "Content-Type": "application/json" },
    });
  };

  // TODO: Fix file handling
  handleOnDrop = async (file) => {
    let b64 = await this.getAndSetBase64(file, this);
  };

  getAndSetBase64 = (file, that) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      that.setState({ imageBase64: reader.result });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  handleFileSubmit = async (documentDID) => {};

  setSeal = (files) => {
    this.setState({ notaryDigitalSealBase64: files.base64 });
  };

  setPemKey = async (files) => {
    const file = files.file;
    try {
      if (file !== null) {
        let pubPrivPem = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            let privatePem1 = ev.target.result;
            let publicPem1;
            try {
              publicPem1 = NotaryUtil.getPublicKeyFromPrivateKey(privatePem1);
            } catch (err) {
              reject(err);
            }
            resolve({ publicPem: publicPem1, privatePem: privatePem1 });
          };
          reader.onerror = reject;
          reader.readAsText(file);
        });

        console.log("PUBLIC!");
        console.log(pubPrivPem.publicPem);
        this.setState({ notaryPemPublicKey: pubPrivPem.publicPem });
        this.setState({ notaryPemPrivateKey: pubPrivPem.privatePem });
      }
    } catch (err) {
      console.error(err);
    }
  };

  onNetworkChanged = async (payload) => {
    let value = payload.target.id;
    this.setState({ network: value });
  };

  onInfoChanged = async (payload) => {
    let key = payload.target.name;
    let value = payload.target.value;

    this.setState({ [key]: value });

    if (key == "notaryEthPrivateKey") {
      try {
        const publicKey = EthCrypto.publicKeyByPrivateKey(value);
        const address = EthCrypto.publicKey.toAddress(publicKey);
        this.setState({ notaryEthAddress: address });
      } catch (err) {
        console.log("setting public key error");
        console.log(err);
      }
    }

    if (key == "custodianEmail") {
      if (this.isEmail(value)) {
        let emailTxtRecord = await axios.get(GET_TXT_RECORD_URL + value);

        let message;
        if (emailTxtRecord.data == undefined || emailTxtRecord.data == "") {
          message =
            "Email not found on ENS, A new DID will be created and email sent to retrieve private key";
        } else {
          message = "Email found on ENS! - " + emailTxtRecord.data;
        }

        this.setState({ custodianMessage: message });
      }
    }

    if (key === "documentType" && value === "test") {
      this.setTestData();
    }
  };

  isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  isSubmitEnabled = () => {
    const {
      notaryType,
      expirationDate,
      notaryId,
      documentDidAddress,
      notaryEthAddress,
      notaryEthPrivateKey,
      notaryPemPublicKey,
      notaryPemPrivateKey,
      custodianEthAddress,
      custodianEmail,
      imageBase64,
      notaryDigitalSealBase64,
      documentType,
      custodianFullname,
      notaryFullname,
      county,
    } = { ...this.state };

    let disabled = true;

    if (
      notaryType &&
      expirationDate &&
      notaryId &&
      notaryEthAddress &&
      notaryEthPrivateKey &&
      notaryPemPublicKey &&
      notaryPemPrivateKey &&
      custodianEmail &&
      imageBase64 &&
      notaryDigitalSealBase64 &&
      documentType &&
      custodianFullname &&
      notaryFullname &&
      county
    ) {
      disabled = false;
    }

    return disabled;
  };

  render() {
    const { isLoading } = { ...this.state };

    let toRender = (
      <div>
        <VerifiedFormNotarize
          handleOnDrop={this.handleOnDrop}
          handleFileSubmit={this.handleFileSubmit}
          isLoading={isLoading}
        />
        <DocumentInformation
          values={this.state}
          onInfoChanged={this.onInfoChanged}
        />
        <NotaryInformation
          values={this.state}
          notaryEthPrivateKey={this.state.notaryEthPrivateKey}
          generateEmailDid={this.generateEmailDid}
          onInfoChanged={this.onInfoChanged}
          setSeal={this.setSeal}
          setPemKey={this.setPemKey}
        />
        <CustodianInformation
          values={this.state}
          custodianMessage={this.state.custodianMessage}
          onInfoChanged={this.onInfoChanged}
        />
        <NotarySignature
          values={this.state}
          onInfoChanged={this.onInfoChanged}
        />
        <NotarizationRecord
          values={this.state}
          onInfoChanged={this.onInfoChanged}
          onNetworkChanged={this.onNetworkChanged}
        />
        <div className="text-center">
          <Button disabled={this.isSubmitEnabled()} onClick={this.generateVC}>
            Notarize Document
          </Button>
        </div>
      </div>
    );

    if (this.state.base64Pdf !== undefined) {
      toRender = (
        <NotarizationComplete
          vcJwtLink={this.state.vcJwtLink}
          savePdf={() => this.state.vc.doc.save()}
          base64Pdf={this.state.base64Pdf}
          did={this.state}
        />
      );
    }

    return (
      <div className="app-container">
        <div className="notarization-components">{toRender}</div>

        <br></br>
        {/* {this.state.base64Pdf && <PdfPreview fileURL={this.state.base64Pdf} />}*/}
        {this.state.base64Pdf && (
          <a href={this.state.vcJwtLink}> Link to VC on Ledger </a>
        )}
        <br></br>
        {this.state.base64Pdf && (
          <a href={this.state.uniresolverLink}>
            Link to Uniresolver (Blockchain only):
          </a>
        )}
      </div>
    );
  }
}
export default NotarizePage;
