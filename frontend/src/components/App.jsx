import "./App.css";
import React from "react";
import ButtonList from "./ButtonList";

const buttonsOptions = {
  buttons: [
    {
      icon: "fa-solid fa-user",
      text: " Log In",
      color: "##692de7",
      bg: "#fff",
    },
    {
      icon: "fa-regular fa-user",
      text: " Sign Up",
      color: "#fff",
      bg: "#692de7",
    },
  ],
};

const App = () => {
  return (
    <div style={{ display: "relative" }}>
      <ButtonList options={buttonsOptions} />
    </div>
  );
};

export default App;
