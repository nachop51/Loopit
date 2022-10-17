import AuthButtons from "./AuthButtons";
import Content from "./Content";
import Footer from "../Footer";
import Logo from "../Logo";

const LandingPage = () => {
  return (
    <>
      <Logo link="/" />
      <AuthButtons />
      <Content />
      <Footer />
    </>
  );
};

export default LandingPage;
