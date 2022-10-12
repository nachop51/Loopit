import loopit from "../api/loopit";

export const logIn = (id, username) => {
  return {
    type: "LOG_IN",
    payload: {
      id,
      username,
    },
  };
};

export const signOut = () => async (dispatch) => {
  await loopit.get("/auth/logout");

  dispatch({ type: "SIGN_OUT" });
};

export const checkUserAuth = () => async (dispatch) => {
  try {
    const response = await loopit.get("/auth/verify");

    const payload = {};
    switch (response.data.status) {
      case "authorized":
        payload.status = true;
        payload.id = response.data.id;
        payload.username = response.data.username;
        break;
      default:
        payload.status = false;
        payload.id = null;
        payload.username = null;
        break;
    }

    dispatch({
      type: "CHECK_USER_AUTH",
      payload,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_USER_AUTH",
      payload: { status: false, id: null, username: null },
    });
  }
};

export const fetchLoops = () => async (dispatch) => {
  const response = await loopit.get("/loops/all");

  dispatch({ type: "FETCH_LOOPS", payload: response.data.loops });
};
