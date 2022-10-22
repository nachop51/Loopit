import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import LandingPage from "./LandingPage/";
import { checkUserAuth } from "../actions";
import Appliaction from "./Appliaction";
import LoadingSpinner from "../assets/nobg.gif";
import ErrorPage from "./404";
import About from "./About/";

const App = ({ isSignedIn, checkUserAuth, id }) => {
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth, isSignedIn]);

  if (isSignedIn === null) {
    return (
      <>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="l/*"
          element={<Appliaction userStatus={isSignedIn} id={id} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    id: state.auth.id,
  };
};

export default connect(mapStateToProps, { checkUserAuth })(App);
