import "./Tags.css";

const Tags = ({ language }) => {
  return (
    <div className="tag-container">
      <span className={language + " tag"}>{language}</span>
    </div>
  );
};

export default Tags;
