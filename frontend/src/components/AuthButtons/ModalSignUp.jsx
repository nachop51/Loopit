import "./Modal.css";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logIn } from "../../actions";
import useEsc from "../../hooks/useEsc";

import {
  validateFullname,
  validateUserRegister,
  validatePassword,
  validateEmail,
  validatePasswordConfirmation,
} from "./validations";
import loopit from "../../api/loopit";

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
      const response = await loopit.post("/auth/register", {
        email: email,
        username: user,
        fullname: fullname,
        password: pass,
      });
      if (response.status === 200) {
        logIn(response.data.username);
        navigate("/");
      }
    } catch (error) {
      let errors = {};
      const setError = (key, value) => {
        errors = setIn(errors, key, value);
      };
      const message = error.response.data.error;
      const flags = {
        email: false,
        user: false,
      };
      if (message[1] === "Email already exists") {
        setError("email", "This email already exists");
        flags.email = true;
      }
      if (message[0] === "Username already exists") {
        setError("user", "This username already exists");
        flags.user = true;
      }
      if (flags.email && flags.user) {
        console.log("Server error, try again later");
      }
      if (Object.entries(errors).length > 0) {
        return errors;
      }
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <h4>Create a new account</h4>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
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
              <button className="btn" type="submit">
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
