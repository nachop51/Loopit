import "./Card.css";
import PropTypes from "prop-types";

const Card = ({ label, text, children }) => {
  return (
    <div className="feature-box">
      {children}
      <h3 className="feature-tertiary">{label}</h3>
      <p className="feature-p">{text}</p>
    </div>
  );
};

Card.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Card;
