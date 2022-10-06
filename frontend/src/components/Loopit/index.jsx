import "./index.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";

const LoopitApp = ({ userStatus }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStatus) {
      navigate("/home");
    }
  });

  return (
    <>
      <h1>App</h1>
      <Nav />
    </>
  );
};

export default LoopitApp;
