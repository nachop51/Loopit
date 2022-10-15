import "./LoopList.css";
import LoopItem from "./LoopItem";

const LoopList = ({ loops }) => {
  if (!loops) {
    return <div className="loading">Loading...</div>;
  }

  const renderedLoops = loops.map((loop) => {
    return <LoopItem key={loop.id} loop={loop} />;
  });

  return <div className="loop-list">{renderedLoops}</div>;
};

export default LoopList;
