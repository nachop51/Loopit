import "./Nav.css";

import { HiCode } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <AiOutlineHome />
      </Link>
      <Link to="/favorites">
        <FiHeart />
      </Link>
      <Link to="/create-loop">
        <HiCode />
      </Link>
      <Link to="/account">
        <BiUserCircle />
      </Link>
    </nav>
  );
};

export default Nav;
