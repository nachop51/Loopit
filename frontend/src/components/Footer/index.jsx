import "./Footer.css";
import { GrInstagram, GrTwitter } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="container-icons">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          <GrInstagram />
        </a>
        <a href="#twiter">
          <GrTwitter />
        </a>
      </p>
      <p>All rights reserved &copy;Loopit 2022</p>
    </footer>
  );
};

export default Footer;
