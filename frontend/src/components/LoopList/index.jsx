import "./LoopList.css";
import LoopItem from "./LoopItem";
// import loopit from "../../api/loopit";
import { fetchLoops } from "../../actions";

import InfiniteScroll from "react-infinite-scroll-component";
import MoonLoader from "react-spinners/MoonLoader";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

const LoopList = ({
  collection, // all, saved, created, search
  fetchLoops, // ^ function to fetch data
  user, // & username or search query
  search, // & search option
  loops, // & loops from store
  hasMore, // & hasMore from store
  children, // * children from parent
  oC = "", // * optional class
  username, // ! This is the username of the logged in user
  loading,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    let param;
    if (collection === "created") {
      param = user ? user : username;
    } else if (collection === "search") {
      param = search;
    }
    fetchLoops(collection, 1, param, true);
    setPage(2);
  }, [collection, fetchLoops, search, user, username]);

  const fetchMoreLoops = () => {
    setTimeout(() => {
      if (hasMore) {
        let param;
        if (collection === "created") {
          param = user ? user : username;
        } else if (collection === "search") {
          param = search;
        }
        fetchLoops(collection, page, param, false);
        setPage(page + 1);
      }
    }, 1000);
  };

  // TODO: Add a spinner instead of a skeleton.
  const skeleton = () => {
    return [0, 1, 2, 3, 4].map((i) => {
      return (
        <div className="loop" key={i}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Skeleton width={90} />
            <Skeleton height={90} />
          </div>
          <Skeleton />
        </div>
      );
    });
  };

  const renderLoops = loops ? (
    <InfiniteScroll
      dataLength={loops.length}
      next={fetchMoreLoops}
      hasMore={hasMore}
      loader={
        <div
          className="loop"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "3rem",
            paddingBottom: "3rem",
          }}
        >
          <MoonLoader
            color={"#3f51b5"}
            size={50}
            speedMultiplier={0.75}
            aria-label="Loading Spinner"
          />
        </div>
      }
    >
      {loops.map((loop) => {
        return <LoopItem collection={collection} key={loop.id} loop={loop} />;
      })}
    </InfiniteScroll>
  ) : (
    <h2>Oops, looks like there's no loops to show</h2>
  );

  return (
    <div className={"loop-list " + oC}>
      {children ? children : null}
      {loading ? skeleton() : renderLoops}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loops: state.loops.loops,
    loading: state.loops.loading,
    hasMore: state.loops.hasMore,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, {
  fetchLoops,
})(LoopList);
