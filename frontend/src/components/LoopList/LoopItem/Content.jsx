import "./Content.css";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Content = ({ content, language }) => {
  return (
    <div className="loop-content">
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
  language: PropTypes.string,
};

export default Content;
