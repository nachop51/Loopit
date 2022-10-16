import "./LoopList.css";
import LoopItem from "./LoopItem";
import loopit from "../../api/loopit";

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
      setLoopsList(response.data.loops);
    };

    fetchLoops();
  }, [endpoint, page]);

  const renderedLoops = loopsList.map((loop) => {
    return <LoopItem key={loop.id} loop={loop} />;
  });

  return <div className="loop-list">{renderedLoops}</div>;
};

export default LoopList;