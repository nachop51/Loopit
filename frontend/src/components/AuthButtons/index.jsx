import "./AuthButtons.css";
import React, { useState } from "react";
import { connect } from "react-redux";

import ModalLogIn from "./ModalLogIn";
import ModalSignUp from "./ModalSignUp";
import { signOut } from "../../actions";

const AuthButtons = ({ signOut, isSignedIn }) => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signIsOpen, setSignIsOpen] = useState(false);

  if (isSignedIn === null) {
    return null;
  }

  if (isSignedIn) {
    return (
      <div className="buttons-container">
        <button className="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

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

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signOut })(AuthButtons);
