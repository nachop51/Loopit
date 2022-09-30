import "./ButtonList.css";
import React, { useState } from "react";
import Modal from "./Modal";

const ButtonList = () => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signIsOpen, setSignIsOpen] = useState(false);

  return (
    <div className="buttons-container">
      <button className="button" onClick={() => setLoginIsOpen(!loginIsOpen)}>
        Log In
      </button>
      {loginIsOpen && (
        <Modal mode="LOGIN" setModalIsOpen={setLoginIsOpen} label="Log In!" />
      )}
      <button className="button" onClick={() => setSignIsOpen(!signIsOpen)}>
        Sign Up
      </button>
      {signIsOpen && (
        <Modal
          mode="REGISTER"
          setModalIsOpen={setSignIsOpen}
          label="Sign In!"
        />
      )}
    </div>
  );
};

export default ButtonList;
