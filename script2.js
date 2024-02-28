import React from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const initialValues = {
  personalInformation: {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    pan: "",
    aadharNumber: "",
    gender: "",
    maritalStatus: "",
    numberOfDependents: "",
  },
  contactInformation: {
    email: "",
    mobileNo: "",
    address: "",
    pincode: "",
    city: "",
    landmark: "",
  },
  professionalInformation: {
    appointmentDate: "",
    designation: "",
    associationType: "",
    experienceInYears: "",
    relationshipType: "",
    shareholding: "",
  },
};

const validationSchema = Yup.object().shape({
  personalInformation: Yup.object().shape({
    gender: Yup.string().required("Please select your gender"),
    maritalStatus: Yup.string().required("Please select your marital status"),
  }),
  contactInformation: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  professionalInformation: Yup.object().shape({
    designation: Yup.string().required("Please enter your designation"),
    associationType: Yup.string().required(
      "Please select your association type"
    ),
  }),
});

const MultiAccordionForm3 = () => {
  const handleSubmit = (values) => {
    console.log("sdkjfnskfs",values);
    console.log(values); // Send data to API or perform actions
  };

  return (
    <Formik
      initialValues={{ forms: [initialValues] }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ values, errors, touched, setFieldValue }) => (
        <Form style={{ width: "100%" }}>
          <FieldArray
            style={{ width: "100%" }}
            name="forms"
            render={(arrayHelpers) => (
              <div style={{ width: "100%" }}>
                {values.forms.map((form, index) => (
                  <Accordion key={index} style={{ width: "100%" }}>
                    <AccordionSummary
                      style={{ width: "100%" }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>Form {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ width: "100%" }}>
                      <div style={{ width: "100%" }}>
                        <Accordion style={{ width: "100%" }}>
                          <AccordionSummary
                            style={{ width: "100%" }}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography>Personal Information</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <RadioGroup
                              name={`forms[${index}].personalInformation.gender`}
                              value={
                                values.forms[index].personalInformation.gender
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].personalInformation.gender`,
                                  event.target.value
                                );
                              }}
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                              />
                            </RadioGroup>
                            <ErrorMessage
                              name={`forms[${index}].personalInformation.gender`}
                              component="div"
                              className="error"
                            />
                            <TextField
                              fullWidth
                              label="Marital Status"
                              name={`forms[${index}].personalInformation.maritalStatus`}
                              select
                              SelectProps={{
                                value:
                                  values.forms[index].personalInformation
                                    .maritalStatus,
                                onChange: (event) => {
                                  setFieldValue(
                                    `forms[${index}].personalInformation.maritalStatus`,
                                    event.target.value
                                  );
                                },
                              }}
                            >
                              <MenuItem value="">
                                Select Marital Status
                              </MenuItem>
                              <MenuItem value="married">Married</MenuItem>
                              <MenuItem value="single">Single</MenuItem>
                            </TextField>
                            <ErrorMessage
                              name={`forms[${index}].personalInformation.maritalStatus`}
                              component="div"
                              className="error"
                            />
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Contact Information</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField
                              style={{ width: "100%" }}
                              fullWidth
                              label="Email"
                              name={`forms[${index}].contactInformation.email`}
                              value={
                                values.forms[index].contactInformation.email
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].contactInformation.email`,
                                  event.target.value
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`forms[${index}].contactInformation.email`}
                              component="div"
                              className="error"
                            />
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Professional Information</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextField
                              fullWidth
                              label="Appointment Date"
                              type="date"
                              name={`forms[${index}].professionalInformation.appointmentDate`}
                              value={
                                values.forms[index].professionalInformation
                                  .appointmentDate
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].professionalInformation.appointmentDate`,
                                  event.target.value
                                );
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Experience (Years)"
                              type="number"
                              name={`forms[${index}].professionalInformation.experienceInYears`}
                              value={
                                values.forms[index].professionalInformation
                                  .experienceInYears
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].professionalInformation.experienceInYears`,
                                  event.target.value
                                );
                              }}
                            />
                            <TextField
                              fullWidth
                              label="Relationship Type"
                              select
                              name={`forms[${index}].professionalInformation.relationshipType`}
                              value={
                                values.forms[index].professionalInformation
                                  .relationshipType
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].professionalInformation.relationshipType`,
                                  event.target.value
                                );
                              }}
                            >
                              <MenuItem value="">
                                Select Relationship Type
                              </MenuItem>
                              <MenuItem value="type1">Type 1</MenuItem>
                              <MenuItem value="type2">Type 2</MenuItem>
                            </TextField>
                            <TextField
                              fullWidth
                              label="Shareholding"
                              name={`forms[${index}].professionalInformation.shareholding`}
                              value={
                                values.forms[index].professionalInformation
                                  .shareholding
                              }
                              onChange={(event) => {
                                setFieldValue(
                                  `forms[${index}].professionalInformation.shareholding`,
                                  event.target.value
                                );
                              }}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button onClick={() => arrayHelpers.push(initialValues)}>
                  + Add Form
                </Button>
                <Button type="submit">Save as Draft</Button>
              </div>
            )}
          />
        </Form>
      )}
    />
  );
};

export default MultiAccordionForm3;
