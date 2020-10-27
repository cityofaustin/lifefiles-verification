import md5 from "md5";
import EthrDID from "ethr-did";
import NodeRSA from "node-rsa";
import DidJWTVC from "did-jwt-vc";
import PDFUtil from "./PdfUtil";

const selfResolveUrl =
  "https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aweb%3A";

const createVerifiableCredential = DidJWTVC.createVerifiableCredential;
const createPresentation = DidJWTVC.createPresentation;

class NotaryUtil {
  // To be called by the notary
  static async createNotarizedDocument(
    notaryType,
    expirationDate,
    notaryId,
    documentDidAddress,
    notaryEthAddress,
    notaryEthPrivateKey,
    notaryPublicKey,
    notaryPrivateKey,
    ownerEthAddress,
    imageBase64,
    notaryDigitalSealBase64,
    documentType,
    ownerFullname,
    caseworkerFullname,
    county,
    network
  ) {
    try {
      let documentDID = "did:ethr:" + documentDidAddress;
      const vpDocumentDid = "";

      if (network === "s3") {
        // https://s3uploader-s3uploadbucket-1ccds11btwih.s3.amazonaws.com/did%3Aweb%3A0xd54a349B70142879A0c6e0d54B7580BA81F4DB48.json
        documentDID =
          "did:web:" + selfResolveUrl + documentDidAddress + ".json";
      }

      const now = Date.now();
      const issueTime = Math.floor(now / 1000);
      const issuanceDate = now;

      console.log({ ownerFullname });
      const { pdfArrayBuffer, doc } = await PDFUtil.stitchTogetherPdf(
        imageBase64,
        "Texas",
        county,
        issuanceDate,
        documentType,
        ownerFullname,
        notaryDigitalSealBase64,
        caseworkerFullname,
        documentDID
      );

      const documentHash = md5(this.arrayBuffertoBuffer(pdfArrayBuffer));
      const encryptedHash = this.encryptX509(notaryPrivateKey, documentHash);

      const vc = await this.createVC(
        notaryEthAddress,
        notaryEthPrivateKey,
        ownerEthAddress,
        documentDID,
        vpDocumentDid,
        notaryType,
        issuanceDate,
        issueTime,
        expirationDate,
        notaryId,
        notaryPublicKey,
        encryptedHash
      );
      return { vc, doc };
    } catch (err) {
      console.error("Failure in create notarized document");
      console.error(err);
    }
  }

  static async createVC(
    issuerAddress,
    issuerPrivateKey,
    ownerAddress,
    documentDID,
    vpDocumentDid,
    notaryType,
    issuanceDate,
    issueTime,
    expirationDate,
    notaryId,
    notaryPublicKey,
    encryptedHash
  ) {
    const issuerEthrDid = new EthrDID({
      address: issuerAddress,
      privateKey: issuerPrivateKey,
    });

    const ownerDID = "did:ethr:" + ownerAddress;
    const issuerDID = "did:ethr:" + issuerAddress;

    const vcPayload = {
      sub: ownerDID,
      nbf: issueTime,
      vc: {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://www.w3.org/2018/credentials/examples/v1",
        ],
        id: documentDID,
        type: ["VerifiableCredential", "TexasNotaryCredential"],

        issuer: {
          id: issuerDID,
          ensDomain: "emailtodid.eth",
          notaryId,
          notaryPublicKey,
        },

        issuanceDate,
        expirationDate,

        verifiablePresentationReference: {
          id: vpDocumentDid,
        },

        credentialSubject: {
          id: ownerDID,
          ensDomain: "emailtodid.eth",
          TexasDigitalNotary: {
            type: notaryType,
            signedDocumentHash: encryptedHash, //  The hash is encrypted with the notary priv key.
            hashType: "MD5",
          },
        },
      },
    };

    const vcJwt = await createVerifiableCredential(vcPayload, issuerEthrDid);
    return vcJwt;
  }

  static encryptX509(privateKey, data) {
    const key = new NodeRSA(privateKey);
    const encrypted = key.encryptPrivate(data, "base64");
    return encrypted;
  }

  static getPublicKeyFromPrivateKey(privateKey) {
    const key = new NodeRSA();
    key.importKey(privateKey, "pkcs1");
    const publicPem = key.exportKey("pkcs1-public-pem");
    return publicPem;
  }

  static arrayBuffertoBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
    }
    return buf;
  }

  static async createVP(address, privateKey, vcJwt, vpDocumentDidAddress) {
    const did = new EthrDID({
      address,
      privateKey,
    });

    const vpPayload = {
      vp: {
        id: "did:ethr:" + vpDocumentDidAddress,
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiablePresentation"],
        verifiableCredential: [vcJwt],
      },
    };

    const vpJwt = await createPresentation(vpPayload, did);
    return vpJwt;
  }

  // // To be called by the owner
  // static anchorVpToBlockchain(vpJwt: string, network: string) {
  //   NotaryService.anchorVpToBlockchain(vpJwt, network);
  // }
}

export default NotaryUtil;
