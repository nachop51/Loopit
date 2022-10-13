import "./Language.css";

const Language = ({ language }) => {
  return (
    <div className="language-container">
      <span className={language + " language"}>{language}</span>
    </div>
  );
};

export default Language;
