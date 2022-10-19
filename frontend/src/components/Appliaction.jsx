import { Routes, Route } from "react-router-dom";
// import { useState } from "react";

import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../assets/nobg.gif";
import Logo from "./Logo";
import Nav from "./NavBar";
import Footer from "./Footer";
import ErrorPage from "./404";
import LoopitApp from "./Loopit";
import CreateLoop from "./pages/CreateLoop";
import Saved from "./pages/Saved/";
import Account from "./pages/Account";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
// import SearchLoops from "./SearchLoops";

const Appliaction = ({ userStatus, id }) => {
  useAuth(userStatus);

  // const [search, setSearch] = useState("");

  if (!userStatus) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <img src={LoadingSpinner} alt="Spinner" className="spinner" />
      </div>
    );
  }

  return (
    <>
      {/* <Nav setSearch={setSearch} search={search}> */}
      <Nav>
        <Logo link="/l" oC="navbar-logo" />
      </Nav>
      <Routes>
        <Route index element={<LoopitApp />} />
        <Route path="create-loop" element={<CreateLoop user_id={id} />} />
        <Route path="saved" element={<Saved />} />
        <Route path="account" element={<Account />} />
        {/* <Route path="search" element={<SearchLoops search={search} />} /> */}
        <Route path="users">
          <Route path=":username" element={<Users />} />
        </Route>
        <Route path="comments">
          <Route path=":id" element={<Comments />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Appliaction;
