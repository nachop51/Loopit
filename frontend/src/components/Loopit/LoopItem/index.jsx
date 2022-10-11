import "./LoopItem.css";
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
      <Interact content={loop.content} />
      <Tags language={loop.language.name} />
      <Content
        language={loop.language.name}
        description={loop.description}
        content={loop.content}
      />
      <Feedback />
    </div>
  );
};

export default LoopItem;
