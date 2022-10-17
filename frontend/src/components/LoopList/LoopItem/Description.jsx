import "./Description.css";
import PropTypes from "prop-types";

const Description = ({ title, description, language }) => {
  return (
    <div className="description">
      <p className="description-title">{title}</p>
      <div className="sub-container">
        <span>{description}</span>
        <span className={language + " default"}>{language}</span>
      </div>
    </div>
  );
};

Description.propType = {
  language: PropTypes.string.isRequired,
};

export default Description;
