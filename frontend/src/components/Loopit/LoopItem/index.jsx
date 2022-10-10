// import "./LoopItem.css";
import "./LoopItemLIGHT.css";
import User from "./User";
import Tags from "./Tags";
import Interact from "./Interact";
import Content from "./Content";
import Feedback from "./Feedback";

// Props will have an username an image, content and more tags
const LoopItem = ({ loop }) => {
  return (
    <div className="loop">
      <User username={loop.user.username} />
      <Interact links={[]} />
      <Tags languages={[]} />
      <Content
        languages={loop.language}
        description={loop.description}
        content={loop.content}
      />
      <Feedback />
    </div>
  );
};

export default LoopItem;
