import LoopList from "../LoopitList";

import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchLoops } from "../../actions";

const LoadLoops = ({ loops, fetchLoops }) => {
  useEffect(() => {
    if (loops.length === 0) {
      fetchLoops();
    }
  }, [fetchLoops, loops]);

  return (
    <>
      <button onClick={() => fetchLoops(2)}></button>
      <LoopList loops={loops} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    loops: state.loops,
  };
};

export default connect(mapStateToProps, { fetchLoops })(LoadLoops);
