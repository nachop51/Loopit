import "./Content.css";

const Content = ({ content, description, language }) => {
  return (
    <div className="loop-content">
      {description}
      <pre>
        <code className="code">{content}</code>
      </pre>
    </div>
  );
};

export default Content;
