const Content = ({ content, description, language }) => {
  return (
    <div className="loop-content">
      {description}
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default Content;
