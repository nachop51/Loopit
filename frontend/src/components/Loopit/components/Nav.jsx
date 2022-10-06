import "./Nav.css";

import { BiCodeAlt } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <AiOutlineHome />
      </Link>
      <Link to="/favorites">
        <BsFillHeartFill />
      </Link>
      <Link to="/create-loop">
        <BiCodeAlt />
      </Link>
      <Link to="/account">
        <RiAccountCircleFill />
      </Link>
    </nav>
  );
};

export default Nav;
