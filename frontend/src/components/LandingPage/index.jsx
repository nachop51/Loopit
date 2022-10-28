import AuthButtons from "./AuthButtons";
import Content from "./Content";
import Footer from "../Footer";
import Logo from "../Logo";

import { useState } from "react";

const LandingPage = ({ userStatus }) => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  return (
    <>
      <Logo link="/" />
      <AuthButtons loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen} />
      <Content userStatus={userStatus} openModal={() => setLoginIsOpen(true)} />
      <Footer />
    </>
  );
};

export default LandingPage;
