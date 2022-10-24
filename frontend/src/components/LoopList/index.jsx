import "./LoopList.css";
import LoopItem from "./LoopItem";
// import loopit from "../../api/loopit";
import { fetchLoops, clearSearch } from "../../actions";

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
  clearSearch,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (collection === "all") {
      fetchLoops(collection, 1);
    } else if (collection === "saved") {
      fetchLoops(collection, 1);
    } else if (collection === "created") {
      fetchLoops(collection, 1, null, username);
    } else if (collection === "search") {
      clearSearch();
      if (user) fetchLoops(collection, 1, "username", user);
      else fetchLoops(collection, 1, "search", search);
    }
    setPage((prevState) => prevState + 1);
  }, [collection, fetchLoops, search, user, username, clearSearch]);

  const fetchMoreLoops = () => {
    setPage((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasMore) {
        if (collection === "all") {
          fetchLoops(collection, page);
        } else if (collection === "saved") {
          fetchLoops(collection, page);
        } else if (collection === "created") {
          fetchLoops(collection, page, null, username);
        } else if (collection === "search") {
          if (user) fetchLoops(collection, page, "username", user);
          else fetchLoops(collection, page, "search", search);
        }
      }
    }, 1000);
  };

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
            {/* <Skeleton width={20} className="circle" /> */}
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

  // useEffect(() => {
  //   setHasData();
  //   if (collection === "all") {
  //     fetchLoops();
  //   } else if (collection === "saved") {
  //     fetchSaves();
  //   } else if (collection === "created") {
  //     fetchCreated(username);
  //   } else if (collection === "search") {
  //     const params = {};
  //     if (user) {
  //       params.term = user;
  //       params.option = "username";
  //     } else {
  //       params.term = search;
  //       params.option = "search";
  //     }
  //     fetchSearch(params.term, params.option);
  //   }

  // const handleRender = () => {
  //   let mapFrom = [];
  //   if (collection === "all") {
  //     mapFrom = loops.all;
  //   } else if (collection === "saved") {
  //     mapFrom = loops.saved;
  //   } else if (collection === "created") {
  //     mapFrom = loops.created;
  //   } else if (collection === "search") {
  //     mapFrom = loops.search;
  //   }

  return (
    <div className={"loop-list " + oC}>
      {children ? children : null}
      {renderLoops}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let loops;

  if (ownProps.collection === "all") {
    loops = state.loops.all;
  } else if (ownProps.collection === "saved") {
    loops = state.loops.saved;
  } else if (ownProps.collection === "created") {
    loops = state.loops.created;
  } else if (ownProps.collection === "search") {
    loops = state.loops.search;
  }
  return {
    loops,
    hasMore: state.loops.hasMore,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, {
  fetchLoops,
  clearSearch,
})(LoopList);
