import "./Nav.css";
import { useState } from "react";

import { HiCode, HiOutlineBookmark } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

const Nav = () => {
  const [active, setActive] = useState(window.location.pathname);

  const routes = [
    { id: "/", icon: <AiOutlineHome /> },
    { id: "/saved", icon: <HiOutlineBookmark /> },
    { id: "/create-loop", icon: <HiCode /> },
    { id: "/account", icon: <BiUserCircle /> },
  ];

  return (
    <nav>
      {routes.map(({ id, icon }) => (
        <Link
          key={id}
          to={id}
          onClick={() => setActive(id)}
          className={active === id ? "active" : ""}
        >
          {icon}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
