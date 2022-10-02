import React, { useState, useEffect } from "react";
import { login, register } from "./validations";
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // http://54.94.125.72:3000/login

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
    if (mode === "LOGIN") {
      login(email, password);
    } else {
      register(email, username, password, confirmPassword);
    }
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
              type="text"
              name="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          {mode === "REGISTER" && (
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          {mode === "REGISTER" && (
            <div>
              <label htmlFor="password2">Repeat password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
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
