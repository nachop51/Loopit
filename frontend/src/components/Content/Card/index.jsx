import "./Card.css";

const Card = ({ label, text, children }) => {
  return (
    <div className="feature-box">
      {children}
      <h3 className="feature-tertiary">{label}</h3>
      <p className="feature-p">{text}</p>
    </div>
  );
};

export default Card;
