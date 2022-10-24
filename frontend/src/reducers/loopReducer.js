const initialState = {
  all: [],
  saved: [],
  created: [],
  search: [],
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
        all:
          state.hasMore !== true ? state.all : state.all.concat(action.payload),
      };
    case "FETCH_SAVED":
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        saved:
          state.hasMore !== true
            ? state.saved
            : state.saved.concat(action.payload),
      };
    case "FETCH_CREATED":
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        created:
          state.hasMore !== true
            ? state.created
            : state.created.concat(action.payload),
      };
    case "FETCH_SEARCH":
      if (action.payload !== undefined) {
        setHasMore = action.payload.length !== 0;
      } else {
        setHasMore = false;
      }
      return {
        ...state,
        hasMore: setHasMore,
        search:
          state.hasMore !== true
            ? state.search
            : state.search.concat(action.payload),
      };
    case "UPDATE_LOOPS":
      let updatedLoops = {
        all: [],
        saved: [],
        created: [],
        search: [],
      };
      let mapFrom = [];
      if (action.payload.collection === "all") {
        mapFrom = JSON.parse(JSON.stringify(state.all));
      } else if (action.payload.collection === "saved") {
        mapFrom = JSON.parse(JSON.stringify(state.saved));
      } else if (action.payload.collection === "created") {
        mapFrom = JSON.parse(JSON.stringify(state.created));
      } else if (action.payload.collection === "search") {
        mapFrom = JSON.parse(JSON.stringify(state.search));
      }
      for (let i = 0; i < mapFrom.length; i++) {
        if (mapFrom[i].id === action.payload.id) {
          if (action.payload.action === "save") {
            mapFrom[i].save = action.payload.state;
          } else {
            mapFrom[i].like = action.payload.state;
          }
          break;
        }
      }
      if (action.payload.collection === "all") {
        updatedLoops.all = mapFrom;
      } else if (action.payload.collection === "saved") {
        updatedLoops.saved = mapFrom;
      } else if (action.payload.collection === "created") {
        updatedLoops.created = mapFrom;
      } else if (action.payload.collection === "search") {
        updatedLoops.search = mapFrom;
      }
      updatedLoops.hasMore = true;
      return updatedLoops;
    case "CLEAR_SEARCH":
      return {
        ...state,
        search: [],
        hasMore: true,
      };
    case "SIGN_OUT":
      return {
        all: [],
        saved: [],
        created: [],
        search: [],
        hasMore: false,
      };
    default:
      return state;
  }
};

export default loopReducer;
