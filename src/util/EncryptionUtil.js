import NodeRSA from "node-rsa";

class EncryptionUtil {
  static decryptX509(publicKeyPem, data) {
    const pubKey = new NodeRSA();
    pubKey.importKey(publicKeyPem, "pkcs1-public-pem");

    const result = pubKey.decryptPublic(data, "utf8"); // use public key for decryption
    return result;
  }
}

export default EncryptionUtil;
