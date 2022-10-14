import { Routes, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../assets/nobg.gif";
import Nav from "./NavBar";
import Logo from "./Logo";
import LoopitApp from "./Loopit";
import CreateLoop from "./pages/CreateLoop";
import Saved from "./pages/Saved";
import Account from "./pages/Account";

const Appliaction = ({ userStatus, id, user }) => {
  useAuth(userStatus);

  if (!userStatus) {
    return <img src={LoadingSpinner} alt="Spinner" className="spinner" />;
  }

  return (
    <>
      <Logo width={50} link="/l" />
      <Nav />
      <main>
        <Routes>
          <Route index element={<LoopitApp />} />
          <Route path="create-loop" element={<CreateLoop />} />
          <Route path="saved" element={<Saved />} />
          <Route path="account" element={<Account />} />
          <Route path="users/*" element={<Account />} />
        </Routes>
      </main>
    </>
  );
};

export default Appliaction;
