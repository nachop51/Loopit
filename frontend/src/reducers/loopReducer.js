const initialState = {
  loops: [],
  hasMore: true,
  loading: true,
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
        loading: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "ENDED_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "SIGN_OUT":
      return {
        loops: [],
        hasMore: false,
        loading: true,
      };
    default:
      return state;
  }
};

export default loopReducer;
