import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "./Logo";
import Nav from "./Loopit/Nav";
import LandingPage from "./LandingPage";
import LoopitApp from "./Loopit";
import CreateLoop from "./Loopit/pages/CreateLoop";
import { checkUserAuth } from "../actions";
// import LoadingSpinner from "../assets/loading_spinner.gif";
import LoadingSpinner from "../assets/nobg.gif";
import Favorites from "./Loopit/pages/Favorites";
import ErrorPage from "./404";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  if (isSignedIn === null) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <Logo />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
          },
          pauseOnBlur: true,
          particles: {
            color: {
              value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.4,
            },
            number: {
              density: {
                enable: true,
                area: 1750,
              },
              value: 100,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      {!stateNav && <Nav />}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<LoopitApp userStatus={isSignedIn} />} />
        <Route path="/create-loop" element={<CreateLoop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} />
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
