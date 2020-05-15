
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

class DidResolverUtil {

  static async getJWTByDid(did) {
    const UNIRESOLVER_API = "https://uniresolver.io/1.0/identifiers/";
    const response = await fetch(UNIRESOLVER_API + did);
    const jsonResponse = await response.json();
    return jsonResponse.didDocument.service[0].serviceEndpoint;
  }

  static getResolver() {
    const providerConfig = {
      name: "rsk:testnet",
      registry: "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b",
      rpcUrl: "https://did.testnet.rsk.co:4444"
    };
    return new Resolver(getResolver(providerConfig));
  }

}

export default DidResolverUtil;
