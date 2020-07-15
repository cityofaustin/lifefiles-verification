
class NotarySearchUtil {

  static async findNotary(notaryId) {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const proxyUrl = '';
    const targetUrl = 'https://direct.sos.state.tx.us/notaries/NotarySearch.asp';
    const input = proxyUrl + targetUrl;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Cookie", "ASPSESSIONIDSUSCQBRB=MCLEAMMCHBNCLHDDBHALNOLN");
    const urlencoded = new URLSearchParams();
    urlencoded.append(":Ssearch_parm1", notaryId);
    urlencoded.append("ssubmit", "Active");
    const init = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded
    };
    try {
      const response = await fetch(input, init);
      const responseJson = await response.text();
      return responseJson;
    } catch (err) {
      console.error(err.message);
    }
  }

}

export default NotarySearchUtil;
