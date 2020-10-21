import { Document, Page, Outline, pdfjs } from "react-pdf";
import React, { Component } from "react";
import * as PropTypes from "prop-types";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      numPages: undefined,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePageChange = (newPageNumber) => {
    const { pageNumber, numPages } = { ...this.state };
    let setPageNumber = pageNumber;
    if (newPageNumber > 0 && newPageNumber <= numPages) {
      setPageNumber = newPageNumber;
    }
    this.setState({ pageNumber: setPageNumber });
  };

  render() {
    const { fileURL } = { ...this.props };
    const { pageNumber } = { ...this.state };
    return (
      <div className="pdf-container">
        <Document
          title=""
          file={fileURL}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            // customTextRenderer={({ str, itemIndex }) => { return (<span>{str}</mark>) }}
            height={482}
          />
        </Document>
        <div className="paginate">
          <span
            className="prev"
            onClick={() => {
              this.handlePageChange(pageNumber - 1);
            }}
          >
            prev
          </span>
          <span className="status">
            Page {pageNumber} of {this.state.numPages}
          </span>
          <span
            className="next"
            onClick={() => this.handlePageChange(pageNumber + 1)}
          >
            next
          </span>
        </div>
      </div>
    );
  }
}

PdfPreview.propTypes = {
  fileURL: PropTypes.string.isRequired,
};

export default PdfPreview;
