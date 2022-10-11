// Interacts props will have the links
import { AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import { VscCopy } from "react-icons/vsc";

const Interact = ({ content, filename }) => {
  return (
    <div className="loop-buttons">
      <div title="Share">
        <AiOutlineShareAlt />
      </div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(content);
        }}
        title="Copy the code"
      >
        <VscCopy />
      </div>
      <div
        title="Download as txt"
        onClick={() => {
          const a = document.createElement("a");
          const blob = new Blob([content], { type: "txt" });
          const url = URL.createObjectURL(blob);
          a.setAttribute("href", url);
          a.setAttribute("download", "Loop");
          a.click();
          a.remove();
          console.log(a);
        }}
      >
        <AiOutlineDownload />
      </div>
    </div>
  );
};

export default Interact;
