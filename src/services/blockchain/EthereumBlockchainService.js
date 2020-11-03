import Web3 from "web3";
import { verifyCredential } from "did-jwt-vc";
import axios from "axios";
import DidRegistryContract from "ethr-did-registry";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

class EthereumBlockchainService {
  INFURA_URI = "https://mainnet.infura.io/v3/f89f8f95ce6c4199849037177b155d08";
  ROPSTEN_URI = "https://ropsten.infura.io/v3/f89f8f95ce6c4199849037177b155d08";
  ETHER_GAS_STATION_API = "https://ethgasstation.info/api/ethgasAPI.json";
  CONTRACT_DEFAULT_GAS = 300000;
  FUND_ACCOUNT_GAS = 21000;
  NAME_KEY =
    "0x6469642f7376632f76706a777400000000000000000000000000000000000000"; // did/svc/vpjwt
  REFUND_GAS_PRICE = 1000000000;

  constructor(network, ethFundingPrivateKey) {
    const infuraNetworkURI =
      network === "blockchain" ? this.INFURA_URI : this.ROPSTEN_URI;

    this.web3 = new Web3(new Web3.providers.HttpProvider(infuraNetworkURI));
    this.fundingAccount = this.web3.eth.accounts.privateKeyToAccount(
      ethFundingPrivateKey
    );
    this.web3.eth.accounts.wallet.add(this.fundingAccount);
    this.didRegContract = new this.web3.eth.Contract(DidRegistryContract.abi);

    // mainnet or ropsten
    this.didRegContract.options.address =
      "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b";

    // more providers - https://github.com/decentralized-identity/ethr-did-resolver/blob/develop/README.md
    const providerConfig = {
      name: "mainnet",
      registry: "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b",
      rpcUrl: infuraNetworkURI,
    };

    this.resolver = new Resolver(getResolver(providerConfig));
    this.nonceOverhead = 0;
  }

  static async createNewDID() {
    let web3 = new Web3();
    const account = web3.eth.accounts.create();
    const privKeyWithoutHeader = account.privateKey.substring(2);
    let did = {
      didAddress: account.address,
      didPrivateKey: privKeyWithoutHeader,
    };
    return did;
  }

  async verifyVC(vcJwt) {
    const verifiedVC = await verifyCredential(vcJwt, this.resolver);
    return verifiedVC;
  }

  async storeDataOnEthereumBlockchain(
    didAddress,
    didPrivateKey,
    validityTime,
    dataToStore
  ) {
    const didAccount = this.web3.eth.accounts.privateKeyToAccount(
      "0x" + didPrivateKey
    );
    const identity = didAddress;
    const value = this.web3.utils.asciiToHex(dataToStore);
    let gasStationPrice = await axios.get(this.ETHER_GAS_STATION_API);
    let payAmount = this.CONTRACT_DEFAULT_GAS;

    this.web3.eth.accounts.wallet.add(didAccount);
    this.web3.eth.transactionPollingTimeout = 3600;
    let nonce =
      (await this.web3.eth.getTransactionCount(this.fundingAccount.address)) +
      this.nonceOverhead;

    this.nonceOverhead++;

    console.log("Starting Eth Transactions with account: " + identity);

    const safeLowGasPrice = 100000000 * (gasStationPrice.data.safeLow / 10);

    try {
      console.log("Send Transaction Start");
      await this.web3.eth.sendTransaction({
        from: this.fundingAccount.address,
        to: identity,
        value: payAmount * safeLowGasPrice,
        gasPrice: safeLowGasPrice,
        gas: this.FUND_ACCOUNT_GAS,
        nonce: nonce,
      });
      console.log(
        identity +
          " Has Been Funded With " +
          payAmount +
          " * " +
          safeLowGasPrice
      );
    } catch (err) {
      console.log("Send transaction error:");
      console.log(err);
    }

    this.nonceOverhead--;

    try {
      console.log("Did Reg Contract Transaction Start");
      await this.didRegContract.methods
        .setAttribute(identity, this.NAME_KEY, value, validityTime)
        .send({
          from: identity,
          gasPrice: safeLowGasPrice,
          gas: payAmount,
        });

      console.log(identity + " VC Has Been Registed On The Blockchain!");
    } catch (err) {
      console.log("Did Reg Contract error:");
      console.log(err);
    }

    this.web3.eth.getBalance(identity, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Send Back Optional Transaction Start");
        let leftOver = result - this.REFUND_GAS_PRICE * this.FUND_ACCOUNT_GAS;

        if (leftOver >= this.REFUND_GAS_PRICE * this.FUND_ACCOUNT_GAS) {
          this.web3.eth
            .sendTransaction({
              from: identity,
              to: this.fundingAccount.address,
              value: leftOver,
              gasPrice: this.REFUND_GAS_PRICE,
              gas: this.FUND_ACCOUNT_GAS,
            })
            .on("error", function (error, receipt) {
              console.log(error);
              console.log(receipt);
            });
        } else {
          console.log(identity + " Does Not Have Enough For Refund.");
        }
      }
    });
  }
}

export default EthereumBlockchainService;
