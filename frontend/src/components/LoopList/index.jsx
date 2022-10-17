import "./LoopList.css";
import LoopItem from "./LoopItem";
// import loopit from "../../api/loopit";
import {
  fetchLoops,
  fetchSaves,
  fetchCreated,
  setHasData,
} from "../../actions";

import { connect } from "react-redux";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoopList = ({
  collection,
  fetchLoops,
  fetchSaves,
  fetchCreated,
  setHasData,
  loops,
  hasData,
  username,
}) => {
  useEffect(() => {
    setHasData();
    if (collection === "all") {
      fetchLoops();
    } else if (collection === "saved") {
      fetchSaves();
    } else if (collection === "created") {
      fetchCreated(username);
    }
  }, [fetchLoops, fetchSaves, fetchCreated, username, setHasData, collection]);

  const handleRender = () => {
    let mapFrom = [];
    if (collection === "all") {
      mapFrom = loops.all;
    } else if (collection === "saved") {
      mapFrom = loops.saved;
    } else if (collection === "created") {
      mapFrom = loops.created;
    }
    if (mapFrom.length === 0) {
      return (
        <div className="no-loops">
          <h2>No loops to show</h2>
        </div>
      );
    }
    return mapFrom.map((loop) => {
      return <LoopItem collection={collection} key={loop.id} loop={loop} />;
    });
  };

  const skeleton = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
      return (
        <div className="loop">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Skeleton width={90} />
            <Skeleton height={90} />
          </div>
          <Skeleton />
        </div>
      );
    });
  };

  return (
    <div className="loop-list">{!hasData ? skeleton() : handleRender()}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    loops: state.loops,
    hasData: state.loops.hasData,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, {
  fetchLoops,
  fetchSaves,
  fetchCreated,
  setHasData,
})(LoopList);
