import React, { useState, useEffect } from "react";
import { validateRegister } from "./validations";
import InputField from "./InputField";
import loopit from "../api/loopit";
import "./Modal.css";

const ModalForm = ({ show, closeModal, openTheOther }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = validateRegister(
      fullname,
      username,
      email,
      password,
      confirmPassword
    );
    setErrors(hasErrors);
    if (hasErrors.length > 0) return;
    console.log("PASO LA PRUEBA");
    register(username, email, fullname, password);
  };

  const register = (username, email, fullname, password) => {
    console.log(username);
    console.log(email);
    console.log(fullname);
    console.log(password);
    try {
      loopit.post("/auth/register", {
        email: email,
        username: username,
        fullname: fullname,
        password: password,
      });
    } catch {
      console.log("SO MANY ERRORS");
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <h4>Create a new account</h4>
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullname"
            type="text"
            ph="John Doe"
            hasError={errors.includes("fullname")}
            error={"A valid full name is required"}
            value={fullname}
            onChanged={setFullname}
          />

          <InputField
            label="Username"
            name="username"
            type="text"
            ph="Example"
            hasError={errors.includes("username")}
            error={"A valid username is required"}
            value={username}
            onChanged={setUsername}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            ph="example@email.com"
            hasError={errors.includes("email")}
            error={"A valid email is required"}
            value={email}
            onChanged={setEmail}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            ph="••••••••"
            hasError={errors.includes("password")}
            error={"A valid password is required"}
            value={password}
            onChanged={setPassword}
          />

          <InputField
            label="Repeat password"
            name="confirm"
            type="password"
            ph="••••••••"
            hasError={errors.includes("confirm")}
            error={"Passwords must match"}
            value={confirmPassword}
            onChanged={setConfirmPassword}
          />
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
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
