import "./Modal.css";
import { Form, Field } from "react-final-form";
import { setIn, FORM_ERROR } from "final-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logIn } from "../../../actions";
import useEsc from "../../../hooks/useEsc";

import {
  validateFullname,
  validateUserRegister,
  validatePassword,
  validateEmail,
  validatePasswordConfirmation,
} from "./validations";
import loopit from "../../../api/loopit";

const ModalForm = ({ show, closeModal, openTheOther, logIn }) => {
  useEsc(show, closeModal);

  const navigate = useNavigate();

  const buildInput = ({ input, meta, label, placeholder }) => {
    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <input
          className={
            (meta.error || meta.submitError) && meta.touched
              ? "error-validator"
              : ""
          }
          {...input}
          placeholder={placeholder}
          id={input.name}
          autoComplete="off"
        />
        <span
          className={`error-message ${
            (meta.error || meta.submitError) && meta.touched ? "show-span" : ""
          }`}
        >
          {meta.error || meta.submitError ? (
            meta.error ? (
              meta.error
            ) : (
              meta.submitError
            )
          ) : (
            <br />
          )}
        </span>
      </div>
    );
  };

  const onSubmit = async ({ fullname, user, email, pass }) => {
    try {
      const f_name = fullname
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      const response = await loopit.post("/auth/register", {
        email: email,
        username: user,
        fullname: f_name,
        password: pass,
      });
      if (response.status === 200) {
        logIn(response.data.id, response.data.username, response.data.theme);
        // setTimeout(() => {
        // }, 5000);
        navigate("/l");
      }
    } catch (error) {
      if (error.message.includes("Network") || error.message.includes("400")) {
        return { [FORM_ERROR]: "Something went wrong, try again later..." };
      }
      let errors = {};
      const setError = (key, value) => {
        errors = setIn(errors, key, value);
      };
      const message = error.response.data.error;
      if (message.email) {
        setError("email", "This email already exists");
      }
      if (message.username) {
        setError("user", "This username already exists");
      }
      if (Object.entries(errors).length > 0) {
        return errors;
      }
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div
        className={`modal-content ${show ? "modal-animation" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Sign Up</h2>
        <h4>Become a looper!</h4>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitError }) => (
            <form onSubmit={handleSubmit} className="form">
              <Field
                name="fullname"
                component={buildInput}
                label="Full Name"
                placeholder="John Code"
                validate={validateFullname}
              />
              <Field
                name="user"
                component={buildInput}
                label="Username"
                placeholder="Looper"
                validate={validateUserRegister}
              />
              <Field
                name="email"
                component={buildInput}
                label="Email"
                placeholder="email@example.com"
                validate={validateEmail}
              />
              <Field
                name="pass"
                component={buildInput}
                label="Password"
                placeholder="••••••••"
                type="password"
                validate={validatePassword}
              />
              <Field
                name="confirmPass"
                component={buildInput}
                label="Confirm Password"
                placeholder="••••••••"
                type="password"
                validate={(value, props) => {
                  return validatePasswordConfirmation(value, props);
                }}
              />
              {submitError && (
                <div className="error-message show-span-form">
                  {submitError}
                </div>
              )}
              <button className="btn btn-primary btn-animation" type="submit">
                Sign Up
              </button>
            </form>
          )}
        />
        <div className="link">
          <p>
            Already have an account?&nbsp;
            <button
              className="linkTo"
              onClick={() => {
                closeModal();
                openTheOther();
              }}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logIn })(ModalForm);
