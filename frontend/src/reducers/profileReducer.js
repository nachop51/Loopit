const profileReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;
    case "SIGN_OUT":
      return null;
    case "UPDATE_USER":
      const data = {
        username: action.payload.username,
        email: action.payload.email,
        full_name: action.payload.fullname,
      };
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
};

export default profileReducer;
