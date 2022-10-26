import LoopList from "../LoopList";
import { useParams } from "react-router-dom";

const SearchLoops = ({ clearSearch }) => {
  const { term } = useParams();

  return (
    <main>
      <LoopList collection="search" search={term}>
        <h1 className="heading-primary">Search...</h1>
      </LoopList>
    </main>
  );
};

export default SearchLoops;
