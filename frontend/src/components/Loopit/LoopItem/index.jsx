import "./LoopItem.css";
import User from "./User";
import Language from "./Language";
import Interact from "./Interact";
import Content from "./Content";
import Feedback from "./Feedback";

// Props will have an username an image, content and more tags
const LoopItem = ({ loop }) => {
  console.log(loop);
  return (
    <div className="loop">
      <User username={loop.user.username} time={loop.create_at} />
      <Interact content={loop.content} />
      <Language language={loop.language.name} />
      <Content
        language={loop.language.name}
        description={loop.description}
        content={loop.content}
      />
      <Feedback loop={loop} />
    </div>
  );
};

export default LoopItem;
