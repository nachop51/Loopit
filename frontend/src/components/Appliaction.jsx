import { Routes, Route } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../assets/nobg.gif";
import Nav from "./NavBar";
import Logo from "./Logo";
import LoopitApp from "./Loopit";
import CreateLoop from "./pages/CreateLoop";
import Saved from "./pages/Saved";
import Account from "./pages/Account";
import ErrorPage from "./404";
import Footer from "./Footer";

const Appliaction = ({ userStatus, id }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </div>
    );
  }

  let counter = 0;

  return (
    <>
      <Nav>
        <Logo link="/l" oC="navbar-logo" />
        <button
          onClick={() => {
            if (counter % 2 === 0) {
              // ! DARK THEME
              // Primary color format: r, g, b
              document.documentElement.style.setProperty(
                "--primary-color",
                "55, 129, 243"
              );
              // Text color format: #hex
              document.documentElement.style.setProperty(
                "--text-color",
                "#fff"
              );
              // Background color format: #hex
              document.documentElement.style.setProperty(
                "--background-color",
                "#15151e"
              );
              // Navbar color format: #hex
              document.documentElement.style.setProperty(
                "--nav-background",
                "#15151e"
              );
            } else {
              // ! LIGHT THEME
              // Primary color format: r, g, b
              document.documentElement.style.setProperty(
                "--primary-color",
                "145, 71, 255"
              );
              // Text color format: #hex
              document.documentElement.style.setProperty(
                "--text-color",
                "#444"
              );
              // Background color format: #hex
              document.documentElement.style.setProperty(
                "--background-color",
                "#efeff1"
              );
              // Navbar color format: #hex
              document.documentElement.style.setProperty(
                "--nav-background",
                "#f7f7f8"
              );
            }
            counter++;
          }}
        >
          Change theme
        </button>
      </Nav>
      <Routes>
        <Route index element={<LoopitApp />} />
        <Route path="create-loop" element={<CreateLoop user_id={id} />} />
        <Route path="saved" element={<Saved />} />
        <Route path="account" element={<Account />} />
        <Route path="users/*" element={<Account />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Appliaction;
