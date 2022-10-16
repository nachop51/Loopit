import "./Nav.css";
import { useState } from "react";

import { HiCode, HiOutlineCode } from "react-icons/hi";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

const Nav = ({ children }) => {
  const [active, setActive] = useState(window.location.pathname);

  const routes = [
    { id: "/l", icon: <AiOutlineHome />, iconActive: <AiFillHome /> },
    { id: "/l/saved", icon: <IoBookmarkOutline />, iconActive: <IoBookmark /> },
    {
      id: "/l/create-loop",
      icon: <HiOutlineCode />,
      iconActive: <HiCode style={{ transform: "scale(1.25)" }} />,
    },
    {
      id: "/l/account",
      icon: <BsPerson />,
      iconActive: <BsPersonFill />,
    },
  ];

  return (
    <nav className="nav">
      {children ? children : null}
      {routes.map(({ id, icon, iconActive }) => (
        <Link
          key={id}
          to={id}
          onClick={() => setActive(id)}
          className={`nav-links ${active === id ? "active" : ""}`}
        >
          {active === id ? iconActive : icon}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
