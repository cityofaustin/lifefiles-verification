import { verifyCredential, verifyPresentation } from "did-jwt-vc";

class VerifiedCredentialUtil {
  static async getVerifiedCredential(jwt, resolver) {
    return await verifyCredential(jwt, resolver);
  }

  static async getVerifiedPresentation(jwt, resolver) {
    return await verifyPresentation(jwt, resolver);
  }

  static timestampsAreValid(expirationDate, iatDate, nbfDate, issuanceDate) {
    let valid = true;
    valid =
      !expirationDate || !iatDate || !nbfDate || !nbfDate || !issuanceDate
        ? false
        : valid;
    valid = new Date(expirationDate) < new Date() ? false : valid;
    valid = new Date(iatDate) > new Date() ? false : valid;
    valid = new Date(nbfDate) > new Date() ? false : valid;
    valid = new Date(issuanceDate) > new Date() ? false : valid;
    return valid;
  }
}

export default VerifiedCredentialUtil;
