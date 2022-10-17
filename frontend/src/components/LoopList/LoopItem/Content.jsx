import "./Content.css";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Content = ({ content, description, language }) => {
  return (
    <div className="loop-content">
      {description}
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        showLineNumbers
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

Content.propTypes = {
  content: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Content;
