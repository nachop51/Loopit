const profileReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};

export default profileReducer;
