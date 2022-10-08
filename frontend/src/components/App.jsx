import "./App.css";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Routes, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Loopit/Nav";
import LandingPage from "./LandingPage";
import LoopitApp from "./Loopit";
import CreateLoop from "./Loopit/pages/CreateLoop";
import { checkUserAuth } from "../actions";
import LoadingSpinner from "../assets/loading_spinner.gif";

const App = ({ isSignedIn, checkUserAuth }) => {
  const [stateNav, setStateNav] = useState(false);
  let location = useLocation();

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  useEffect(() => {
    if (window.location.pathname === "/home") setStateNav(true);
    else setStateNav(false);
  }, [location]);

  if (isSignedIn === null) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <Logo />
      {!stateNav && <Nav />}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LoopitApp userStatus={isSignedIn} />} />
        <Route path="/create-loop" element={<CreateLoop />} />
        <Route path="*" element={<h1>Not Found</h1>} />
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
