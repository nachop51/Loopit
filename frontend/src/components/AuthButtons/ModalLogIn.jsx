import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
// import { validateLogin } from "./validations";
// import loopit from "../../api/loopit";
import "./Modal.css";

const ModalLogIn = ({ show, closeModal, openTheOther }) => {
  useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === "Escape") {
        if (!show) return;
        closeModal();
      }
    };
    document.body.addEventListener("keydown", closeEsc);
    return () => {
      document.body.removeEventListener("keydown", closeEsc);
    };
  });

  const renderErrors = ({ error, active, touched }) => {
    return (
      <span className={`error-message ${error && touched ? "show-span" : ""}`}>
        {error ? error : <br />}
      </span>
    );
  };

  const buildInput = ({ input, meta, label, placeholder }) => {
    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <input
          className={meta.error && meta.touched ? "error-validator" : ""}
          {...input}
          placeholder={placeholder}
          id={input.name}
          autoComplete="off"
        />
        {renderErrors(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Log In</h2>
        <h4>To continue to Loopit</h4>
        <Form
          onSubmit={onSubmit}
          validate={(formValues) => {
            const errors = {};
            if (!formValues.username) {
              errors.username = "You must enter a username";
            }
            if (!formValues.password) {
              errors.password = "You must enter a password";
            }
            return errors;
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="form">
              <Field
                name="username"
                component={buildInput}
                label="Username or Email"
                placeholder="email@example.com"
              />
              <Field
                name="password"
                component={buildInput}
                label="Password"
                placeholder="••••••••"
                type="password"
              />
              <button className="btn" type="submit">
                Log In
              </button>
            </form>
          )}
        />
        <div className="link">
          <p>
            Not registered yet?&nbsp;
            <button
              className="linkTo"
              onClick={() => {
                closeModal();
                openTheOther();
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalLogIn;
