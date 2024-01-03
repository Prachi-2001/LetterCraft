import React from "react";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./Letter.css";
import parse from "html-react-parser";

const Letter = () => {
  const { fields, logo, joiningDate, text } = useLocation().state;

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = dd + "-" + mm + "-" + yyyy;
    let pname = fields.usernam.value.split(" ").join("-");
    let filename = pname + "-" + today;
    doc.html(document.getElementById("pdf-div"), {
      callback: function (pdf) {
        pdf.save(`${filename}.pdf`);
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#EFE1E8",
      }}
    >
      <div className="container">
        <div className="row">
          <h1 className="heading text-center" style={{ color: "#24134d" }}>
            Preview
          </h1>

          <div
            className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2"
            id="pdf-div"
            style={{ backgroundColor: "white" }}
          >
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-row mt-2">
              <img
                src={logo}
                alt=""
                className="col-lg-2 col-md-2 col-sm-4 col-4 ms-3"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-4 ms-3">
              <h5>{fields?.usernam?.value}</h5>
              {fields?.add?.value && <h6>{fields?.add?.value}</h6>}
              {fields?.ref?.value && <h6>Ref No: {fields?.ref?.value}</h6>}
              {fields?.desi?.value && (
                <h6>Designation: {fields?.desi?.value}</h6>
              )}
              {joiningDate && (
                <h6>
                  Joining Date: {joiningDate.$d.toLocaleString().split(",")[0]}
                </h6>
              )}
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-2 text-center">
              <h4 className="me-5">
                <u>{fields.compan.value}</u>
              </h4>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center px-5">
              <p className="me-5">
                <h5>{fields.su.value}</h5> {parse(text)}
              </p>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center px-5">
              <p className="me-5">
                <h5>{fields?.su?.value}</h5> {parse(text)}
              </p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-4 ms-3">
              <h6>Thanks and Regards,</h6>
              {fields?.issuerName?.value && (
                <h6>{fields?.issuerName?.value}</h6>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center align-items-center text-center">
            <button
              className="btn btn-primary mb-2 mt-1 mybtn"
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
