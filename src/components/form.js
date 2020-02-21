import React, { useState } from "react"
import styled from "styled-components"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import device from "./device"

const FieldWrapper = styled.div``

const ButtonWrapper = styled.div``

const SubmitError = styled.div``

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})

const ContactForm = () => {
  const [error, setError] = useState(false)
  function handleSubmit(values, setSubmitting, resetForm) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...values,
      }),
    })
      .then(() => {
        resetForm()
        console.log("submitted")
      })
      .catch(() => {
        setError(true)
        console.log("error")
      })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        msg: "",
      }}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting, resetForm)
      }}
    >
      {({ isSubmitting }) => (
        <Form
          method="post"
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />

          <FieldWrapper>
            <label htmlFor="name">Name *</label>
            <Field type="text" name="name" className="input" />
            <div className="error">
              <ErrorMessage name="name" />
            </div>
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="email">Email *</label>
            <Field type="email" name="email" className="input" />
            <div className="error">
              <ErrorMessage name="email" />
            </div>
          </FieldWrapper>

          <FieldWrapper>
            <label htmlFor="name">Message</label>
            <Field name="msg" component="textarea" rows="5" className="input" />
          </FieldWrapper>

          <ButtonWrapper>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </ButtonWrapper>
          {error && (
            <SubmitError>Something went wrong. Please try again!</SubmitError>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
