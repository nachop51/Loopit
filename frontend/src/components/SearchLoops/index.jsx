import LoopList from "../LoopList";
import { fetchSearch } from "../../actions/";

import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

const SearchLoops = ({ fetchSearch }) => {
  const { term } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchSearch(term, "search");
  }, [fetchSearch, term, location]);

  return (
    <main>
      <h1 className="heading-primary">Search...</h1>
      <LoopList collection="search" search={term} />
    </main>
  );
};

export default connect(null, { fetchSearch })(SearchLoops);
