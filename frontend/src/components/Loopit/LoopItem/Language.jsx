import "./Language.css";
import PropTypes from "prop-types";

const Language = ({ language }) => {
  return (
    <div className="language-container">
      <span className={language + " language"}>{language}</span>
    </div>
  );
};

Language.propType = {
  language: PropTypes.string.isRequired,
};

export default Language;
