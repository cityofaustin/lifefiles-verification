import jsPDF from "jspdf";
// import { ImageDetail } from './ImageUtil';
// https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html
import Caveat from "../fonts/Caveat/Caveat-normal";
import { format, getDay } from "date-fns";
// import AcroFormTextField from 'jspdf';

export default class PdfUtil {
  static stringPaddedCenter(str, numspace) {
    const spc = Array(numspace).fill(" ").join("");
    return spc + str + spc;
  }

  // export enum ImageType {
  //   PNG = 'PNG',
  //   JPEG = 'JPEG'
  // }

  // export interface ImageDetail {
  //   base64: string;
  //   width: number;
  //   height: number;
  //   imageType: ImageType;
  // }

  static async processImageBase64(imageBase64) {
    const { width, height } = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = imageBase64;
    });
    let imageType;
    if (imageBase64.split(";")[0] === "data:image/png") {
      imageType = "PNG";
    }
    if (imageBase64.split(";")[0] === "data:image/jpeg") {
      imageType = "JPEG";
    }
    return { base64: imageBase64, width, height, imageType };
  }

  static async stitchTogetherPdf(
    scannedImage,
    stateName,
    county,
    notarizedDate,
    documentType,
    ownerFullname,
    notaryDigitalSeal,
    notaryFullname,
    documentDID
  ) {
    //change base64 type into type with extra attributes
    scannedImage = await PdfUtil.processImageBase64(scannedImage);
    notaryDigitalSeal = await PdfUtil.processImageBase64(notaryDigitalSeal);

    // const dateString = 'Dec 31, 2021';
    let dateString = format(notarizedDate, "MMM dd, y");
    if (getDay(notarizedDate) < 10) {
      dateString += " ";
    }
    const pageWidth = 632;
    // pageHeight = 446.5,
    const lineHeight = 1.8;
    const margin = 64;
    const maxLineWidth = pageWidth - margin * 2 + 10;
    // fontSize = 24,
    // ptsPerInch = 72;
    // oneLineHeight = (fontSize * lineHeight) / ptsPerInch;
    const doc = new jsPDF({
      // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
      orientation: "landscape", // "portrait" or "landscape
      unit: "px", // "mm", "cm", "m", "in" or "px"
      format: "a4",
      lineHeight,
    });
    doc.setProperties({ title: "Notarized Document" });
    // adding some padding to the variable fields
    county = PdfUtil.stringPaddedCenter(county, 14 - county.length);
    documentType = PdfUtil.stringPaddedCenter(
      documentType,
      20 - documentType.length
    );

    ownerFullname = PdfUtil.stringPaddedCenter(
      ownerFullname,
      30 - ownerFullname.length
    );
    // console.log(`original width ${scannedImage.width} height ${scannedImage.height}`);
    // newH      x    160*1194/861 for example
    // -----  = -----
    // origH    origW
    const newOrigHeight = 118;
    const newOrigWidth =
      (newOrigHeight * scannedImage.width) / scannedImage.height;
    // console.log(`original new width ${newOrigWidth} height ${newOrigHeight}`);
    // console.log(`original2 width ${notaryDigitalSeal.width} height ${notaryDigitalSeal.height}`);
    const newSealHeight = 31.5;
    const newSealWidth =
      (newSealHeight * notaryDigitalSeal.width) / notaryDigitalSeal.height;
    // https://stackoverflow.com/questions/58449153/jspdf-error-font-does-not-exist-in-vfs-vuejs
    doc.addFileToVFS("Caveat-normal.ttf", Caveat);
    doc.addFont("Caveat-normal.ttf", "Caveat", "normal");
    // console.log(doc.getFontList());

    doc.addImage(
      scannedImage.base64,
      scannedImage.imageType,
      223.2,
      14,
      newOrigWidth,
      newOrigHeight
    );

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(5 * 6);
    doc.text("Certified Copy of a Non-Recordable Document", margin, 157);

    doc.setFontSize(4 * 6);
    doc.text(`State of ${stateName}`, margin, 194);

    const text1 =
      `County of ${county} .\n` +
      `On this date,  ${dateString} , I certify that the preceding of attached document, is a true, exact, complete, and unaltered copy ` +
      `made by me of ${documentType}`;
    const text2 = `, presented to me by the document’s custodian, ${ownerFullname} ,`;
    const text3 =
      `and that, to the best ` +
      "of my knowledge, the photocopied document is neither a public record not a publicly recordable document, certified copies of " +
      "which are available from an official source other than a notary.";
    const textLines1 = doc
      .setFont("Times", "normal")
      .setFontSize(2.3 * 6)
      .splitTextToSize(text1, maxLineWidth);
    const textLines2 = doc
      .setFont("Times", "normal")
      .setFontSize(2.3 * 6)
      .splitTextToSize(text3, maxLineWidth);
    doc.text(textLines1, margin, 220);
    doc.text(text2, margin + 170, 220 + 18.5 * 2);
    doc.text(textLines2, margin, 220 + 18.5 * 3);
    doc.setLineWidth(0.5);
    doc.line(margin + 45, 222, margin + 115, 222); // county
    doc.line(margin + 55, 222 + 18.5, margin + 115, 222 + 18.5); // date
    doc.line(margin + 65, 222 + 18.5 * 2, margin + 165, 222 + 18.5 * 2); // doc type
    doc.line(margin + 368, 222 + 18.5 * 2, margin + 515, 222 + 18.5 * 2); // owner

    doc.addImage(
      notaryDigitalSeal.base64,
      notaryDigitalSeal.imageType,
      margin,
      312,
      newSealWidth,
      newSealHeight
    );
    doc.line(margin, 350, 160, 350);
    doc.setFontSize(2.5 * 6);
    doc.setFont("Helvetica", "normal");
    doc.text("Notary Seal", margin, 364);

    doc.setFont("Caveat", "normal");
    doc.setFontSize(4 * 6);
    doc.text(notaryFullname, 288, 321 + 12);
    doc.line(288, 350, 384, 350);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(2.3 * 6);
    doc.text("(Signature of notary)", 288, 364);

    if (documentDID.includes("web:")) {
      doc.setFontSize(4 * 2); // 4 * 6 factor of 6
    } else {
      doc.setFontSize(4 * 6); // 4 * 6 factor of 6
    }

    doc.text(documentDID, margin, 410.5);

    const pdfArrayBuffer = doc.output("arraybuffer");
    return { pdfArrayBuffer, doc };
  }
}
