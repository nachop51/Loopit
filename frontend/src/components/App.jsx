import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "./Logo";
import Nav from "./NavBar/";
import LandingPage from "./LandingPage";
import LoopitApp from "./Loopit";
import CreateLoop from "./pages/CreateLoop";
import { checkUserAuth } from "../actions";
// import LoadingSpinner from "../assets/loading_spinner.gif";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../assets/nobg.gif";
import Saved from "./pages/Saved";
import ErrorPage from "./404";
import Account from "./pages/Account";
import About from "./AboutPage";

const App = ({ isSignedIn, checkUserAuth, id }) => {
  const [stateNav, setStateNav] = useState(false);
  let location = useLocation();

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  useEffect(() => {
    let loc = window.location.pathname;
    if (["/", "/create-loop", "/saved", "/account"].includes(loc))
      setStateNav(false);
    else setStateNav(true);
  }, [location]);

  if (isSignedIn === null) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </div>
    );
  }

  return (
    <>
      <Logo />
      {!stateNav && <Nav />}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <LoopitApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-loop"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <CreateLoop user_id={id} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/*"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <Account />
            </ProtectedRoute>
          }
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
