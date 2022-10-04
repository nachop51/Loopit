import "./AuthButtons.css";
import React, { useState } from "react";
import ModalLogIn from "./ModalLogIn";
import ModalSignUp from "./ModalSignUp";

const AuthButtons = () => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signIsOpen, setSignIsOpen] = useState(false);

  return (
    <div className="buttons-container">
      <button className="button" onClick={() => setLoginIsOpen(!loginIsOpen)}>
        Log In
      </button>
      <ModalLogIn
        closeModal={() => setLoginIsOpen(false)}
        openTheOther={() => {
          setSignIsOpen(true);
        }}
        show={loginIsOpen}
      />
      <button className="button" onClick={() => setSignIsOpen(!signIsOpen)}>
        Sign Up
      </button>
      <ModalSignUp
        closeModal={() => setSignIsOpen(false)}
        openTheOther={() => {
          setLoginIsOpen(true);
        }}
        show={signIsOpen}
      />
    </div>
  );
};

export default AuthButtons;
