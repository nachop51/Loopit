const INITIAL_STATE = {
  isSignedIn: null,
  username: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, isSignedIn: true, username: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, username: null };
    case "CHECK_USER_AUTH":
      return {
        ...state,
        isSignedIn: action.payload.status,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default authReducer;
