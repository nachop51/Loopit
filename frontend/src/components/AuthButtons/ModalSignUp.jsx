import "./Modal.css";
import { Form, Field } from "react-final-form";
import useEsc from "../../hooks/useEsc";

import {
  validateFullname,
  validateUserRegister,
  validatePassword,
  validateEmail,
  validatePasswordConfirmation,
} from "./validations";
import loopit from "../../api/loopit";

const ModalForm = ({ show, closeModal, openTheOther }) => {
  useEsc(show, closeModal);

  const renderErrors = ({ error, touched }) => {
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

  const onSubmit = async ({ fullname, user, email, pass }) => {
    try {
      const response = await loopit.post("/auth/register", {
        email: email,
        username: user,
        fullname: fullname,
        password: pass,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
      switch (error.response.data.state) {
        case "Bad Request - This email already exists":
          console.log("This email already exists");
          break;
        case "Bad Request - This username already exists":
          console.log("This username already exists");
          break;
        default:
          console.log("Server error, try again later");
          break;
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

export default ModalForm;
