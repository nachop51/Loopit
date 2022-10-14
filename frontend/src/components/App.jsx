import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

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
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <LoopitApp>
                <Nav />
              </LoopitApp>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-loop"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <CreateLoop user_id={id}>
                <Nav />
              </CreateLoop>
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <Saved>
                <Nav />
              </Saved>
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute userStatus={isSignedIn}>
              <Account>
                <Nav />
              </Account>
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
