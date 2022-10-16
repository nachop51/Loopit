import "./Description.css";
import PropTypes from "prop-types";

const Description = ({ title, description, language }) => {
  return (
    <div className="description">
      <p className="description-title">{title}</p>
      <span className={language + " default"}>{language}</span>
      <span>{description}</span>
    </div>
  );
};

Description.propType = {
  language: PropTypes.string.isRequired,
};

export default Description;
