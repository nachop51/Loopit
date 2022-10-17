const initialState = {
  all: [],
  saved: [],
  created: [],
};

const loopReducer = (state = initialState, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case "FETCH_LOOPS":
      return {
        ...state,
        all: action.payload,
      };
    case "FETCH_SAVED":
      return {
        ...state,
        saved: action.payload,
      };
    case "FETCH_CREATED":
      return {
        ...state,
        created: action.payload,
      };
    case "UPDATE_LOOPS":
      let updatedLoops = {
        all: [],
        saved: [],
        created: [],
      };
      let mapFrom = [];
      if (action.payload.collection === "all") {
        mapFrom = JSON.parse(JSON.stringify(state.all));
      } else if (action.payload.collection === "saved") {
        mapFrom = JSON.parse(JSON.stringify(state.saved));
      } else if (action.payload.collection === "created") {
        mapFrom = JSON.parse(JSON.stringify(state.created));
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
      }
      return updatedLoops;
    default:
      return state;
  }
};

export default loopReducer;