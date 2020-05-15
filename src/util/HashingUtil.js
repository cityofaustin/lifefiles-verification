import CryptoJS from "crypto-js";

class HashingUtil {

  static async fileToMd5(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(this.result));
        resolve(hash.toString(CryptoJS.enc.Hex));
      });
      reader.readAsBinaryString(file);
    });
  };

}

export default HashingUtil;
