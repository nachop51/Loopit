import "./Nav.css";
import { useState } from "react";

import { HiCode, HiOutlineCode } from "react-icons/hi";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

const Nav = () => {
  const [active, setActive] = useState(window.location.pathname);

  const routes = [
    { id: "/", icon: <AiOutlineHome />, iconActive: <AiFillHome /> },
    { id: "/saved", icon: <IoBookmarkOutline />, iconActive: <IoBookmark /> },
    { id: "/create-loop", icon: <HiOutlineCode />, iconActive: <HiCode /> },
    { id: "/account", icon: <BiUser />, iconActive: <BiUserCircle /> },
  ];

  return (
    <nav>
      {routes.map(({ id, icon, iconActive }) => (
        <Link
          key={id}
          to={id}
          onClick={() => setActive(id)}
          className={active === id ? "active" : ""}
        >
          {active === id ? iconActive : icon}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
