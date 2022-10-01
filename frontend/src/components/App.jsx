import "./App.css";
import React from "react";
import AuthButtons from "./AuthButtons";
import Logo from "./Logo";
import Content from "./Content";

const App = () => {
  return (
    <React.Fragment>
      <Logo />
      <AuthButtons />
      <Content />
    </React.Fragment>
  );
};

export default App;
