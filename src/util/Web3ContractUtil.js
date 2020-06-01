import Web3 from "web3";
import ENS_REGISTRY_PUBLIC_RESOLVER_ABI_JSON from "../contracts/publicResolverAbi.json";
import axios from "axios";

const INFURA_URI = "https://mainnet.infura.io/v3/";
const INFURA_PROJECT_ID = "f89f8f95ce6c4199849037177b155d08";

const web3 = new Web3(
  new Web3.providers.HttpProvider(INFURA_URI + INFURA_PROJECT_ID)
);

const UNIRESOLVER_CONTRACT_ADDRESS =
  "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b";
const ENS_REGISTRY_PUBLIC_RESOLVER_ADDRESS =
  "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";

const ensContract = new web3.eth.Contract(
  JSON.parse(ENS_REGISTRY_PUBLIC_RESOLVER_ABI_JSON.result),
  ENS_REGISTRY_PUBLIC_RESOLVER_ADDRESS
);

const ENS_NODE =
  "0x3442daf145b62820466398f343a5666abd6b41e9144476431b4360e0007a214e";

class Web3ContractUtil {
  static async getTextRecordByDID(didKey) {
    let textRecord = await ensContract.methods.text(ENS_NODE, didKey).call();
    return textRecord;
  }

  static async getDidTransactionTimestamp(didKey) {
    const documentDidAddress = didKey.split(":")[2];

    const didTransactions = await axios.get(
      `https://api.ethplorer.io/getAddressTransactions/${documentDidAddress}?apiKey=freekey&showZeroValues=true`
    );

    let didTransactionTimestamp;
    for (let transaction of didTransactions.data) {
      if (transaction.to === UNIRESOLVER_CONTRACT_ADDRESS) {
        didTransactionTimestamp = transaction.timestamp;
        break;
      }
    }

    return didTransactionTimestamp;
  }
}

export default Web3ContractUtil;
