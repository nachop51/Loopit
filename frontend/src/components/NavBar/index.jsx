import "./Nav.css";
import { useState } from "react";

import { HiCode, HiOutlineCode } from "react-icons/hi";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { useLocation, useNavigate } from "react-router-dom";

const Nav = ({ children }) => {
  const [active, setActive] = useState(window.location.pathname);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  // let location = useLocation();
  // const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (location.pathname !== "/l/search") {
    //   navigate("/l/search");
    // }
    console.log(search);
  };

  return (
    <nav className="nav">
      {children ? children : null}
      <div className="nav-container">
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
      </div>
      <div className="search">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className={`bar ${isVisible ? "show-bar" : ""}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="nav-links"
            onClick={(e) => {
              setIsVisible(!isVisible);
            }}
          >
            <IoSearchSharp />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
