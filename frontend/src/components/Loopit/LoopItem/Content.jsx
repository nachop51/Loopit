const Content = ({ content, description, language }) => {
  return (
    <div className="loop-content">
      {description}
      <p>{content}</p>
    </div>
  );
};

export default Content;
