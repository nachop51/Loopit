import React, { useState, useEffect } from "react";
import { validateLogin, validateRegister } from "./validations";
import loopit from "../api/loopit";
import "./Modal.css";

const modeOptions = {
  LOGIN: {
    title: "Log In",
    subtitle: "Log In to your account",
    text: "Username or email",
    link: "Not registered yet?",
    linkTo: "Sign Up",
  },
  REGISTER: {
    title: "Sign Up",
    subtitle: "Create a new account",
    text: "Email",
    link: "Already have an account?",
    linkTo: "Log In",
  },
};

const ModalForm = ({ show, closeModal, mode, openTheOther }) => {
  const options = modeOptions[mode];

  const [username, setUsername] = useState({ value: "", error: null });
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: null,
  });

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
    // let errors = null;
    if (mode === "LOGIN") {
      const errors = validateLogin(username.value, password.value);
      if (errors) {
        setUsername({ ...username, error: errors.username });
        setPassword({ ...password, error: errors.password });
        return;
      }

      // sino hay entonces se hace el post
      setUsername({ ...username, error: null });
      setPassword({ ...password, error: null });

      // loopit.post("/login", ! payload here !);
      return;
    }

    const errors = validateRegister(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    if (errors) {
      setUsername({ ...username, error: errors.username });
      setEmail({ ...email, error: errors.email });
      setPassword({ ...password, error: errors.password });
      setConfirmPassword({ ...confirmPassword, error: errors.confirmPassword });
      return;
    }

    // sino hay error entonces se hace el post
    setConfirmPassword({ ...confirmPassword, error: null });
    setPassword({ ...password, error: null });
    setEmail({ ...email, error: null });
    setUsername({ ...username, error: null });

    if (password !== confirmPassword) errors.push("confirm");
    console.log(errors);
    // loopit.post("/register", ! payload here !);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{options.title}</h2>
        <h4>{options.subtitle}</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">{options.text}</label>
            <input
              className={email.error ? "error-validator" : "succes-validator"}
              type="text"
              placeholder="email@example.com"
              value={email.value}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            {/* RENDERIZADO CONDICIONAL si es que existe error para el campo*/}
            {email.error && (
              <span className="error-message">Correo invalido</span>
            )}
          </div>
          {mode === "REGISTER" && (
            <div>
              <label htmlFor="username">Username</label>
              <input
                className={
                  !username.error ? "error-validator" : "succes-validator"
                }
                type="text"
                id="username"
                placeholder="Username"
                value={username.value}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />

              {/* RENDERIZADO CONDICIONAL si es que existe error para el campo*/}
              {!username.error && ( // si no hay error
                <span className="error-message">Username invalido</span>
              )}
            </div>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              className={
                !password.error ? "error-validator" : "succes-validator"
              }
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {!password.error && (
              <span className="error-message">
                La contraseña debe tener al menos 8 caracteres
              </span>
            )}
          </div>
          {mode === "REGISTER" && (
            <div>
              <label htmlFor="confirm">Repeat password</label>
              <input
                className={
                  !confirmPassword.error
                    ? "error-validator"
                    : "succes-validator"
                }
                type="password"
                id="confirm"
                placeholder="••••••••"
                value={confirmPassword.value}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              {!confirmPassword.error && (
                <span className="error-message">
                  Las contraseñas no coinciden
                </span>
              )}
            </div>
          )}
          <button className="btn" type="submit">
            {options.title}
          </button>
        </form>
        <div className="link">
          <p>
            {options.link}{" "}
            <button
              className="linkTo"
              onClick={() => {
                closeModal();
                openTheOther();
              }}
            >
              {options.linkTo}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
