import "./Footer.css";
import { GrInstagram, GrTwitter } from "react-icons/gr";

import { Link } from "react-router-dom";
import image from "../../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Link to="/home">
          <img src={image} alt="logo-footer" width={80} />
        </Link>

        <Link to="/about" id="link-about" className="/about">
          <span>About us</span>
        </Link>

        <p className="container-icons">
          <a href="https://www.instagram.com/loopit.mvp/">
            <GrInstagram />
          </a>
          <a href="https://twitter.com/HolbertonLoopit">
            <GrTwitter />
          </a>
        </p>
      </div>
      <p data-testid="footer-heading" className="footer-copy">
        All rights reserved &copy;Loopit 2022
      </p>
    </footer>
  );
};

export default Footer;
