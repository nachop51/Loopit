import "./Footer.css";
import image from "../../assets/logo2.png";

import { connect } from "react-redux";
import { GrInstagram, GrTwitter } from "react-icons/gr";
import { Link } from "react-router-dom";

import bgLight from "../../assets/violet1.svg";
import bgDark from "../../assets/layered-waves-haikei (3).svg";

const Footer = ({ theme }) => {
  return (
    <footer
      className="footer-container"
      style={{
        backgroundImage: `url(${theme === "light" ? bgLight : bgDark})`,
      }}
    >
      <div className="footer-content">
        <Link to="/">
          <img src={image} alt="logo-footer" width={80} />
        </Link>
        <Link to="/about" id="link-about" className="/about">
          <span>About us</span>
        </Link>
        <p className="container-icons">
          <a
            href="https://www.instagram.com/loopit.mvp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrInstagram />
          </a>
          <a
            href="https://twitter.com/HolbertonLoopit"
            target="_blank"
            rel="noopener noreferrer"
          >
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

const mapStateToProps = (state) => {
  return {
    theme: state.auth.theme,
  };
};

export default connect(mapStateToProps)(Footer);
