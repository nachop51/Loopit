import "./LoopList.css";
import LoopItem from "./LoopItem";
// import loopit from "../../api/loopit";

import { fetchLoops, fetchSaves } from "../../actions";

import { connect } from "react-redux";
import { useEffect } from "react";

const LoopList = ({ collection, fetchLoops, fetchSaves, loops }) => {
  useEffect(() => {
    if (collection === "all") {
      fetchLoops();
    } else if (collection === "saved") {
      fetchSaves();
    }
  }, [fetchLoops, fetchSaves, collection]);

  const handleRender = () => {
    let mapFrom = [];
    if (collection === "all") {
      mapFrom = loops.all;
    } else if (collection === "saved") {
      mapFrom = loops.saved;
    } else if (collection === "created") {
      mapFrom = loops.created;
    }
    return mapFrom.map((loop) => {
      return <LoopItem collection={collection} key={loop.id} loop={loop} />;
    });
  };

  return <div className="loop-list">{handleRender()}</div>;
};

const mapStateToProps = (state) => {
  return {
    loops: state.loops,
  };
};

export default connect(mapStateToProps, {
  fetchLoops,
  fetchSaves,
  // fetchCreated,
})(LoopList);
