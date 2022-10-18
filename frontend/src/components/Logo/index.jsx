import logo from "../../assets/primary-logo.png";
import blueLogo from "../../assets/BlueLogo.png";
import { connect } from "react-redux";

import { switchTheme } from "../../actions";
import "./Logo.css";

import { Link } from "react-router-dom";

// oC means optionalClass
const Logo = ({ link, oC, theme, switchTheme }) => {
  const handleMode = () => {
    if (theme === "light") {
      // ! DARK THEME
      // Primary color format: r, g, b
      document.documentElement.style.setProperty(
        "--primary-color",
        "55, 129, 243"
      );
      // Text color format: #hex
      document.documentElement.style.setProperty("--text-color", "#fff");
      // Text dark color format: #hex
      document.documentElement.style.setProperty("--text-dark", "#aaa");
      // Text light color format: #hex
      document.documentElement.style.setProperty("--text-light", "#444");
      // Background color format: #hex
      document.documentElement.style.setProperty(
        "--background-color",
        "#15151e"
      );
      // Navbar color format: #hex
      document.documentElement.style.setProperty("--nav-background", "#15151e");
    } else {
      // ! LIGHT THEME
      // Primary color format: r, g, b
      document.documentElement.style.setProperty(
        "--primary-color",
        "145, 71, 255"
      );
      // Text color format: #hex
      document.documentElement.style.setProperty("--text-color", "#444");
      // Text dark color format: #hex
      document.documentElement.style.setProperty("--text-dark", "#222");
      // Text light color format: #hex
      document.documentElement.style.setProperty("--text-light", "#666");
      // Background color format: #hex
      document.documentElement.style.setProperty(
        "--background-color",
        "#efeff1"
      );
      // Navbar color format: #hex
      document.documentElement.style.setProperty("--nav-background", "#f7f7f8");
    }
  };

  return (
    <>
      <div className={oC ? oC : "logo"}>
        <Link to={link}>
          <img
            className="logo-img"
            src={theme === "light" ? logo : blueLogo}
            alt="Loopit logo"
          />
        </Link>
      </div>
      <button
        className="theme-btn"
        onClick={() => {
          switchTheme();
          handleMode(theme);
        }}
      >
        Change theme
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.auth.theme,
  };
};

export default connect(mapStateToProps, { switchTheme })(Logo);
