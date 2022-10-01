import React, { useState } from "react";
import "./Modal.css";

const modeOptions = {
  LOGIN: {
    title: "Log In",
    subtitle: "Log In to your account",
    text: "Username or email",
    link: "Not registered yet?",
    linkTo: "Sing Up",
  },
  REGISTER: {
    title: "Sign Up",
    subtitle: "Create a new account",
    text: "Email",
    link: "Already have an account?",
    linkTo: "Log In",
  },
};

const ModalForm = ({ show, closeModal, mode }) => {
  const options = modeOptions[mode];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
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
              id="email"
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
                id="username"
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
              id="password"
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>
          )}
          <button type="submit">{options.title}</button>
        </form>
        <div className="link">
          <p>
            {options.link}{" "}
            <a className="linkTo" href="/xd">
              {options.linkTo}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
