// Interacts props will have the links
import { AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import { VscCopy } from "react-icons/vsc";
import "./LoopItemLIGHT.css";

const Interact = () => {
  return (
    <div className="loop-buttons">
      <div title="Share">
        {" "}
        <AiOutlineShareAlt />
      </div>
      <div title="Copy">
        <VscCopy />
      </div>
      <div title="Download">
        <AiOutlineDownload />
      </div>
    </div>
  );
};

export default Interact;
