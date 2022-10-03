import "./AuthButtons.css";
import React, { useState } from "react";
import Modal from "./Modal";

const AuthButtons = () => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signIsOpen, setSignIsOpen] = useState(false);

  return (
    <div className="buttons-container">
      <button className="button" onClick={() => setLoginIsOpen(!loginIsOpen)}>
        Log In
      </button>
      <Modal
        mode="LOGIN"
        closeModal={() => setLoginIsOpen(false)}
        openTheOther={() => {
          setSignIsOpen(true);
        }}
        show={loginIsOpen}
      />
      <button className="button" onClick={() => setSignIsOpen(!signIsOpen)}>
        Sign Up
      </button>
      <Modal
        mode="REGISTER"
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
