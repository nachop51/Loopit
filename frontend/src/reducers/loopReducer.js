const initialState = {
  loops: [],
  hasMore: true,
};

const loopReducer = (state = initialState, action) => {
  let setHasMore;
  switch (action.type) {
    case "FETCH_LOOPS":
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        loops:
          state.hasMore !== true
            ? state.loops
            : state.loops.concat(action.payload),
      };
    case "CLEAR_LOOPS":
      return {
        ...state,
        loops: [],
        hasMore: true,
      };
    case "SIGN_OUT":
      return {
        loops: [],
        hasMore: false,
      };
    default:
      return state;
  }
};

export default loopReducer;
