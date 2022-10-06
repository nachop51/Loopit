import Image from "../../assets/logo2.png";
import "./Logo.css";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/home">
        <img className="logo-img" src={Image} alt="Loopit logo" />
      </Link>
    </div>
  );
};

export default Logo;
