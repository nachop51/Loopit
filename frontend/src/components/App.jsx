import "./App.css";
import React from "react";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import Content from "./Content";
import Footer from "./Footer";

const App = () => {
  return (
    <React.Fragment>
      <Logo />
      <AuthButtons />
      <Content />
      <Footer />
    </React.Fragment>
  );
};

export default App;
