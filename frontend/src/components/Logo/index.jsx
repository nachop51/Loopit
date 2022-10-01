import Image from "../../assets/logo2.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <a href="/home">
        <img className="logo-img" src={Image} alt="Loopit logo" />
      </a>
    </div>
  );
};

export default Logo;
