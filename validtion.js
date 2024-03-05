import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  forms: Yup.array().of(
    Yup.object().shape({
      personalInformation: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string(),
        lastName: Yup.string().required('Last Name is required'),
        dob: Yup.date().required('Date of Birth is required'),
        pan: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN'),
        aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Invalid Aadhaar Number'),
        gender: Yup.string().required('Gender is required'),
        maritalStatus: Yup.string().required('Marital Status is required'),
        numberOfDependents: Yup.number().required('Number of Dependents is required'),
      }),
      contactInformation: Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobileNo: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile Number is required'),
        address: Yup.string().required('Address is required'),
        pincode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid pincode').required('Pincode is required'),
        city: Yup.string().required('City is required'),
        landmark: Yup.string(),
      }),
      professionalInformation: Yup.object().shape({
        appointmentDate: Yup.date().required('Appointment Date is required'),
        designation: Yup.string().required('Designation is required'),
        associationType: Yup.string().required('Association Type is required'),
        experienceInYears: Yup.number().required('Experience in Years is required'),
        relationshipType: Yup.string().required('Relationship Type is required'),
        shareholding: Yup.number().required('Shareholding is required'),
      }),
    })
  ),
});

const MyForm = () => (
  <Formik
    initialValues={{
      forms: [
        {
          personalInformation: {
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '',
            pan: '',
            aadharNumber: '',
            gender: '',
            maritalStatus: '',
            numberOfDependents: '',
          },
          contactInformation: {
            email: '',
            mobileNo: '',
            address: '',
            pincode: '',
            city: '',
            landmark: '',
          },
          professionalInformation: {
            appointmentDate: '',
            designation: '',
            associationType: '',
            experienceInYears: '',
            relationshipType: '',
            shareholding: '',
          },
        },
      ],
    }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {/* Your form fields here */}
  </Formik>
);
