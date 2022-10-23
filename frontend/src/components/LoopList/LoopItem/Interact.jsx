// Interacts props will have the links
import { RiShareForwardFill } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import PropTypes from "prop-types";

const Interact = ({ content, filename }) => {
  const createToDownload = () => {
    const a = document.createElement("a");
    const blob = new Blob([content], { type: "txt" });
    const url = URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("download", filename || "Loop");
    a.click();
    a.remove();
  };

  const handleShare = () => {
    const shareData = {
      title: "Loop",
      text: "Loop",
      url: "http://localhost:3001/l",
    };

    navigator.share(shareData);
  };

  return (
    <div className="loop-buttons">
      <div title="Share" onClick={handleShare}>
        <RiShareForwardFill />
      </div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(content);
        }}
        title="Copy the code"
      >
        <MdContentCopy />
      </div>
      <div title="Download as txt" onClick={createToDownload}>
        <HiDownload />
      </div>
    </div>
  );
};

Interact.propTypes = {
  content: PropTypes.string.isRequired,
  // filename: PropTypes.string.isRequired,
};

export default Interact;
