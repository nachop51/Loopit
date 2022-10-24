import "./Footer.css";
import image from "../../assets/logo2.png";

import { connect } from "react-redux";
import { GrInstagram, GrTwitter } from "react-icons/gr";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Link to="/">
          <img src={image} alt="logo-footer" width={80} />
        </Link>
        <div className="">
          <Link to="/about" id="link-about" className="/about">
            <span>About us&nbsp;</span>
          </Link>
          |
          <a
            href="mailto:loopitshare@gmail.com"
            id="link-about"
            className="/about"
          >
            <span>&nbsp;Report bug</span>
          </a>
        </div>
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
