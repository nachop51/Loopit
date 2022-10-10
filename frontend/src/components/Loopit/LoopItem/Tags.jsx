import "./Tags.css";

const Tags = ({ languages }) => {
  console.log(languages);

  return (
    <div className="tag-container">
      <span
        className={
          languages.name ? `tag ${languages.name.toLowerCase()}` : "tag"
        }
      >
        {languages.name}
      </span>
    </div>
  );
};

export default Tags;
