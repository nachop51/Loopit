import "./LoopList.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import LoopItem from "./LoopItem/";
import { fetchLoops } from "../../actions";

const LoopList = ({ loops, fetchLoops }) => {
  useEffect(() => {
    if (loops.length === 0) {
      fetchLoops();
    }
  }, [fetchLoops, loops.length]);

  const renderedLoops = loops.map((loop) => {
    return <LoopItem key={loop.id} loop={loop} />;
  });

  return <div className="loop-list">{renderedLoops}</div>;
};

const mapStateToProps = (state) => {
  return { loops: state.loops };
};

export default connect(mapStateToProps, { fetchLoops })(LoopList);
