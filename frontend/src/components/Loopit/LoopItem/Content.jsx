import "./Content.css";
import PropTypes from "prop-types";

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

Content.propTypes = {
  content: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Content;
