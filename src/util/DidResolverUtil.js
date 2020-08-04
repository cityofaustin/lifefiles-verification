import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

class DidResolverUtil {
  static async getInfoByDocumentDid(did) {
    const UNIRESOLVER_API =
      "https://cors-anywhere.herokuapp.com/https://uniresolver.io/1.0/identifiers/";
    const response = await fetch(UNIRESOLVER_API + did);
    const jsonResponse = await response.json();
    const { didDocument } = { ...jsonResponse };
    const vpJwt =
      didDocument.service &&
      didDocument.service.length > 0 &&
      didDocument.service[0].serviceEndpoint
        ? didDocument.service[0].serviceEndpoint
        : "";
    const ownerPublicKey =
      didDocument.publicKey &&
      didDocument.publicKey.length > 0 &&
      didDocument.publicKey[0].id
        ? didDocument.publicKey[0].id
        : "";
    return { vpJwt, ownerPublicKey };
  }

  static getResolver() {
    const providerConfig = {
      name: "mainnet",
      registry: "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b",
      rpcUrl: "https://mainnet.infura.io/v3/f89f8f95ce6c4199849037177b155d08",
    };

    return new Resolver(getResolver(providerConfig));
  }
}

export default DidResolverUtil;
