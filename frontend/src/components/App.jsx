import "./App.css";
import React, { useEffect } from "react";
import Logo from "./Logo";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "./LandingPage";
import LoopitApp from "./Loopit";
import { checkUserAuth } from "../actions";

const App = ({ isSignedIn, checkUserAuth }) => {
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  return (
    <>
      <Logo />
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LoopitApp userStatus={isSignedIn} />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { checkUserAuth })(App);
