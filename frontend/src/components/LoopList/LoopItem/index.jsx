import "./LoopItem.css";
import User from "./User";
import Language from "./Language";
import Interact from "./Interact";
import Content from "./Content";
import Feedback from "./Feedback";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Props will have an username an image, content and more tags
const LoopItem = ({ loop, loading }) => {
  if (loading) {
    // return (
    //   <div className="loop">
    //     <User username={<Skeleton />} time={loop.create_at} />
    //     <Interact content={<Skeleton />} filename={<Skeleton />} />
    //     <Content
    //       language={<Skeleton />}
    //       description={<Skeleton />}
    //       content={<Skeleton count={3}/>}
    //     />
    //     <Feedback loop={<Skeleton />} />
    //   </div>
    // );
    return (
      <div className="loop">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Skeleton width={90} />
          <Skeleton height={90} />
        </div>
      </div>
    );
  }

  return (
    <div className="loop">
      <User username={loop.user.username} time={loop.create_at} />
      <Interact
        content={String.fromCharCode(...loop.content.data)}
        filename={loop.filename}
      />
      <Language language={loop.language.name} />
      <Content
        language={loop.language.name}
        description={loop.description}
        content={String.fromCharCode(...loop.content.data)}
      />
      <Feedback loop={loop} />
    </div>
  );
};

export default LoopItem;
