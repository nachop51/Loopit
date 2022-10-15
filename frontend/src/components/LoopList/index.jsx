import "./LoopList.css";
import LoopItem from "./LoopItem";
import loopit from "../../api/loopit";
import Skeleton from "react-loading-skeleton";

import { useState, useEffect } from "react";

const LoopList = ({ endpoint }) => {
  const [loopsList, setLoopsList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLoops = async () => {
      const response = await loopit.get(endpoint, {
        params: {
          limit: 10,
          page,
        },
      });
      console.log(response.data.loops);
      setLoopsList(response.data.loops);
    };

    fetchLoops();
  }, [endpoint, page]);

  if (loopsList === []) {
    return (
      <div className="loading">
        <Skeleton />
      </div>
    );
  }

  const renderedLoops = loopsList.map((loop) => {
    return <LoopItem key={loop.id} loop={loop} />;
  });

  return <div className="loop-list">{renderedLoops}</div>;
};

export default LoopList;
