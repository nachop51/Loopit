import "./LoopItem.css";
import User from "./User";
import Description from "./Description";
import Interact from "./Interact";
import Content from "./Content";
import Feedback from "./Feedback";

// Props will have an username an image, content and more tags
const LoopItem = ({ collection, loop, loading }) => {
  return (
    <div className="loop">
      <User username={loop.user.username} time={loop.create_at} />
      <Interact
        content={String.fromCharCode(...loop.content.data)}
        filename={loop.filename}
      />
      <Description
        title={loop.name}
        description={loop.description}
        language={loop.language.name}
      />
      <Content
        language={loop.language.name}
        content={String.fromCharCode(...loop.content.data)}
      />
      <Feedback loop={loop} collection={collection} />
    </div>
  );
};

export default LoopItem;
