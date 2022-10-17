// import Image from "../../assets/logo2.png";
import Image from "../../assets/primary-logo.png";
import BlueImage from "../../assets/BlueLogo.png";
import "./Logo.css";

import { Link } from "react-router-dom";

// oC means optionalClass
const Logo = ({ link, oC }) => {
  return (
    <div className={oC ? oC : "logo"}>
      <Link to={link}>
        <img className="logo-img" src={BlueImage || Image} alt="Loopit logo" />
      </Link>
    </div>
  );
};

export default Logo;
