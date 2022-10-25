import "./LoopList.css";
import LoopItem from "./LoopItem";
// import loopit from "../../api/loopit";
import { fetchLoops, clearLoops } from "../../actions";

import InfiniteScroll from "react-infinite-scroll-component";

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
  clearLoops,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    clearLoops();
    let firstParam, secondParam;
    if (collection === "created") {
      firstParam = "username";
      if (user) {
        secondParam = user;
      } else {
        secondParam = username;
      }
    } else if (collection === "search") {
      secondParam = search;
    }
    fetchLoops(collection, 1, firstParam, secondParam);
    setPage(2);
  }, [collection, fetchLoops, search, user, username, clearLoops]);

  const fetchMoreLoops = () => {
    setTimeout(() => {
      if (hasMore) {
        let firstParam, secondParam;
        if (collection === "created") {
          firstParam = "username";
          if (user) {
            secondParam = user;
          } else {
            secondParam = username;
          }
        } else if (collection === "search") {
          secondParam = search;
        }
        fetchLoops(collection, page, firstParam, secondParam);
        setPage(page + 1);
      }
    }, 1000);
  };

  // TODO: Add a spinner instead of a skeleton.
  const skeleton = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
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
      loader={skeleton()}
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
      {renderLoops}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loops: state.loops.loops,
    hasMore: state.loops.hasMore,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, {
  fetchLoops,
  clearLoops,
})(LoopList);
