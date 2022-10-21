import "./Description.css";
import PropTypes from "prop-types";

const Description = ({ title, description, language }) => {
  return (
    <div className="description">
      <h2 className="description-title">{title}</h2>
      <div className="sub-container">
        <span>{description}</span>
        <span id="tag" className={language + " default"}>
          {language}
        </span>
      </div>
    </div>
  );
};

Description.propType = {
  language: PropTypes.string.isRequired,
};

export default Description;
