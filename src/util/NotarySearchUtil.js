class NotarySearchUtil {
  static async findNotary(notaryId) {
    // This is our test notary
    if ("" + notaryId === "12345") {
      return {
        Name: "Billy Caseworker",
        Address: "101 Austin Street",
        Expires: "2030-01-01",
        County: "Travis",
      };
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();

    // Test Notary
    // urlencoded.append(":Ssearch_parm1", "6274756");
    urlencoded.append(":Ssearch_parm1", "" + notaryId);
    urlencoded.append(":Ssearch_parm2", "");
    urlencoded.append(":Ssearch_parm3", "");
    urlencoded.append(":Ssearch_parm4", "");
    urlencoded.append(":Ssearch_parm5", "");
    urlencoded.append(":Ssearch_parm6", "");
    urlencoded.append(":Ssearch_parm7", "");
    urlencoded.append("submit1", "Search All");
    urlencoded.append("ssubmit", "All");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://cors-elsewhere.herokuapp.com/https://direct.sos.state.tx.us/notaries/NotarySearch.asp",
        requestOptions
      );

      const responseHtml = await response.text();
      const parsedInfoJson = this.parseNotaryInfo(responseHtml);

      return parsedInfoJson;
    } catch (err) {
      console.error(err.message);
    }
  }

  static parseNotaryInfo(htmlBlob) {
    let returnInfo = {};
    let attributes = ["Name:", "Address:", "Expires:", "County:"];

    if (htmlBlob.indexOf("No records found.") !== -1) {
      return {};
    }

    for (let attribute of attributes) {
      let attributeIndex = htmlBlob.lastIndexOf(attribute);

      if (attributeIndex !== -1) {
        let cutString = htmlBlob.slice(attributeIndex, attributeIndex + 200);
        let endingIndex = cutString.indexOf("</strong>");

        let attributeBlob = htmlBlob.slice(
          attributeIndex,
          attributeIndex + endingIndex
        );

        attributeBlob = attributeBlob.replace("<strong>", "");
        attributeBlob = attributeBlob.replace("</strong>", "");
        attributeBlob = attributeBlob.replace("<td>", "");
        attributeBlob = attributeBlob.replace("</td>", "");
        attributeBlob = attributeBlob.replace("<br>", " ");
        attributeBlob = attributeBlob.replace("&nbsp;", " ");
        attributeBlob = attributeBlob.replace(attribute, "");

        let key = attribute.replace(":", "");
        returnInfo[key] = attributeBlob;
      }
    }

    return returnInfo;
  }
}

export default NotarySearchUtil;
