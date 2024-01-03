import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "./quill";
import { z } from "zod";
import "./Home.css";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const Home = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  // const [error, setError] = useState(false);
  // const [helperText, setHelperText] = useState("");
  const [logo, setLogo] = useState(
    "https://rusutikaa.github.io/docs/developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/defaultphoto_2x.png"
  );

  // input form fileds
  const [fields, setFields] = useState({
    su: { value: "", error: false, helperText: "" },
    compan: { value: "", error: false, helperText: "" },
    usernam: { value: "", error: false, helperText: "" },
    add: { value: "", error: false, helperText: "" },
    ref: { value: "", error: false, helperText: "" },
    desi: { value: "", error: false, helperText: "" },
    issuerName: { value: "", error: false, helperText: "" },
  });

  const submitDetails = (e) => {
    e.preventDefault();
    if (
      !fields.compan.value.trim() ||
      !fields.su.value.trim() ||
      logo ===
        "https://rusutikaa.github.io/docs/developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Art/defaultphoto_2x.png" ||
      !text.trim() ||
      !fields.usernam.value.trim()
    )
      alert("Subject, Company, letter body, Logo, Employee Name are required!");
    else {
      navigate(`generateletter`, {
        state: {
          fields,
          logo,
          joiningDate,
          text,
        },
      });
    }
  };

  useEffect(() => {
    if (window.screen.width < 585)
      alert("Please open in a larger device for best experience!");
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setLogo(base64.toString());
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  // zod schema's
  const stringSchema = z
    .string()
    .max(250, "This field must be at most 250 characters")
    .min(3, "This field should have atleast 3 characters!");

  const textSchema = z
    .string()
    .max(5000, "This field must be at most 5000 characters")
    .min(10, "This field should have atleast 10 characters!");

  const handleFieldChange = (fieldName) => (e) => {
    e.preventDefault();
    const value = e.target.value;

    // Validate using Zod schema
    const response = stringSchema.safeParse(value);
    console.log(response);
    // Update state for the specific field
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: {
        value: value,
        error: !response.success,
        helperText: response.success ? "" : response?.error?.issues[0]?.message,
      },
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "rgb(248, 232, 238)",
      }}
    >
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-sm-12 col-12 text-center mq"
            style={{ height: "80%" }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10%" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="form-group text-center">
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  className="form-control-file d-none"
                  id="exampleFormControlFile1"
                  onChange={(e) => uploadImage(e)}
                />
                <div className="form-group">
                  <div className="text-center mb-2">
                    <img
                      className="rounded mt-5"
                      src={logo}
                      style={{
                        width: "35%",
                        height: "35%",
                        border: "5px solid #9505E3",
                      }}
                      alt=""
                    />
                  </div>
                  <label
                    htmlFor="exampleFormControlFile1"
                    className="btn btn-primary mybtn"
                  >
                    Upload a logo
                  </label>
                </div>
              </div>
            </Box>
            <div className="CKedit d-flex justify-content-center mt-3 ">
              <div className="editor" style={{ backgroundColor: "#bee1e6" }}>
                <ReactQuill
                  modules={QuillModules}
                  formats={QuillFormats}
                  value={text}
                  placeholder="Write letter content here..."
                  error={error}
                  helperText={helperText}
                  onChange={(e) => {
                    const value = e;
                    const response = textSchema.safeParse(value);
                    if (!response.success) {
                      setError(true);
                      setHelperText(response.error.issues[0].message);
                    } else {
                      setError(false);
                      setHelperText("");
                    }
                    setText(e);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-4 tfield">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "5vh" },
                "& input": {
                  color: "black", // Set the default text color to black
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Subject"
                InputLabelProps={{
                  style: { fontWeight: "bold" },
                }}
                error={fields.su.error}
                helperText={fields.su.helperText}
                variant="standard"
                value={fields.su.value}
                onChange={handleFieldChange("su")}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Company Name"
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.compan.error}
                helperText={fields.compan.helperText}
                value={fields.compan.value}
                onChange={handleFieldChange("compan")}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Employee Name"
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.usernam.error}
                helperText={fields.usernam.helperText}
                value={fields.usernam.value}
                onChange={handleFieldChange("usernam")}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Address"
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.add.error}
                helperText={fields.add.helperText}
                value={fields.add.value}
                onChange={handleFieldChange("add")}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Reference No."
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.ref.error}
                helperText={fields.ref.helperText}
                value={fields.ref.value}
                onChange={handleFieldChange("ref")}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Designation"
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.desi.error}
                helperText={fields.desi.helperText}
                value={fields.desi.value}
                onChange={handleFieldChange("desi")}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Joining Date"
                  value={joiningDate}
                  onChange={(date) => setJoiningDate(date)}
                  variant="standard"
                  error={false}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
              </LocalizationProvider>
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Issuer Name"
                InputLabelProps={{ style: { fontWeight: "bold" } }}
                variant="standard"
                error={fields.issuerName.error}
                helperText={fields.issuerName.helperText}
                value={fields.issuerName.value}
                onChange={handleFieldChange("issuerName")}
              />
            </Box>

            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-info mybtn text-white mt-3 mb-2"
                onClick={submitDetails}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
