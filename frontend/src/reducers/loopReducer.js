const loopReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_LOOPS":
      return action.payload;
    default:
      return state;
  }
};

export default loopReducer;
