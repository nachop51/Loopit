import React, { useState, useEffect } from "react";
import { validateLogin } from "./validations";
import loopit from "../api/loopit";
import "./Modal.css";

const ModalLogIn = ({ show, closeModal, openTheOther }) => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

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
    const hasErrors = validateLogin(input, password);
    setErrors(hasErrors);
    if (hasErrors) return;
    logIn(input, password);
  };

  const logIn = async (input, password) => {
    try {
      const response = await loopit.post("/auth/login", {
        user: input,
        password: password,
      });
      console.log(response);
    } catch {
      setErrors(true);
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Log In</h2>
        <h4>To continue to Loopit</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="input">Username or email</label>
            <input
              type="text"
              id="input"
              placeholder="email@example.com"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              required
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="text"
              id="pass"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          {errors && (
            <span className="error-message">Invalid username or password</span>
          )}
          <button className="btn" type="submit">
            Log In
          </button>
        </form>
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
