const initialState = {
  all: [],
  saved: [],
  created: [],
  search: [],
  hasData: false,
};

const loopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HAS_DATA":
      return {
        ...state,
        hasData: false,
      };
    case "FETCH_LOOPS":
      return {
        ...state,
        all: action.payload,
        hasData: true,
      };
    case "FETCH_SAVED":
      return {
        ...state,
        saved: action.payload,
        hasData: true,
      };
    case "FETCH_CREATED":
      return {
        ...state,
        created: action.payload,
        hasData: true,
      };
    case "FETCH_SEARCH":
      return {
        ...state,
        search: action.payload,
        hasData: true,
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
      updatedLoops.hasData = true;
      return updatedLoops;
    case "CLEAR_LOOPS":
      return {
        all: [],
        saved: [],
        created: [],
        search: [],
        hasData: false,
      };
    case "SIGN_OUT":
      return {
        all: [],
        saved: [],
        created: [],
        search: [],
        hasData: false,
      };
    default:
      return state;
  }
};

export default loopReducer;
