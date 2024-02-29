import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

// import Dropdown from "./Dropdown"; // Assuming Dropdown component is imported and implemented as mentioned in the previous response

const initialValues = {
  dropdown1: "",
  dropdown2: "",
  dropdown3: "",
  dropdown4: "",
  file1: null,
  file2: null,
  file3: null,
  file4: null,
};

const options = ["Option 1", "Option 2", "Option 3"];
const validationSchema = Yup.object().shape({
  dropdown1: Yup.string()
    .required("Dropdown 1 is required")
    .test("unique", "Option already selected", function (value) {
      return (
        !this.parent.dropdown2 ||
        (this.parent.dropdown2 !== value &&
          this.parent.dropdown3 !== value &&
          this.parent.dropdown4 !== value)
      );
    }),
  dropdown2: Yup.string()
    .required("Dropdown 2 is required")
    .test("unique", "Option already selected", function (value) {
      return (
        !this.parent.dropdown1 ||
        (this.parent.dropdown1 !== value &&
          this.parent.dropdown3 !== value &&
          this.parent.dropdown4 !== value)
      );
    }),
  dropdown3: Yup.string()
    .required("Dropdown 3 is required")
    .test("unique", "Option already selected", function (value) {
      return (
        !this.parent.dropdown1 ||
        (this.parent.dropdown1 !== value &&
          this.parent.dropdown2 !== value &&
          this.parent.dropdown4 !== value)
      );
    }),
  dropdown4: Yup.string()
    .required("Dropdown 4 is required")
    .test("unique", "Option already selected", function (value) {
      return (
        !this.parent.dropdown1 ||
        (this.parent.dropdown1 !== value &&
          this.parent.dropdown2 !== value &&
          this.parent.dropdown3 !== value)
      );
    }),
  file1: Yup.mixed().required("File 1 is required"),
  file2: Yup.mixed().required("File 2 is required"),
  file3: Yup.mixed().required("File 3 is required"),
  file4: Yup.mixed().required("File 4 is required"),
});
const Dropdown = ({ name, label, value, options, onChange, error }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
      >
        <MenuItem value="">Select Option</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && <div className="error">{error}</div>}
    </FormControl>
  );
};

const FormWithDropdownsAndFiles = () => {
  const handleSubmit = (values) => {
    console.log(values); // You can submit the form data here
  };

  return (
    <div>
      <h1>Form with Dropdowns and Files</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            {[1, 2, 3, 4].map((index) => (
              <div key={index}>
                <Field name={`dropdown${index}`}>
                  {({ field }) => (
                    <Dropdown
                      name={field.name}
                      label={`Dropdown ${index}`}
                      value={field.value}
                      options={options}
                      onChange={handleChange}
                      error={touched[field.name] && errors[field.name]}
                    />
                  )}
                </Field>
                <input
                  type="file"
                  onChange={(event) =>
                    setFieldValue(`file${index}`, event.currentTarget.files[0])
                  }
                  style={{ marginTop: "10px" }}
                />
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormWithDropdownsAndFiles;
