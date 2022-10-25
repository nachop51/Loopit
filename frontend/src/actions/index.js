import loopit from "../api/loopit";

export const logIn = (id, username, theme, editorTheme) => {
  return {
    type: "LOG_IN",
    payload: {
      id,
      username,
      theme,
      editorTheme,
    },
  };
};

export const updateUser = (username, email, fullname, theme, editorTheme) => {
  return {
    type: "UPDATE_USER",
    payload: {
      username,
      email,
      fullname,
      theme,
      editorTheme,
    },
  };
};

export const signOut = () => async (dispatch) => {
  await loopit.get("/auth/logout");

  dispatch({ type: "SIGN_OUT" });
};

export const checkUserAuth = () => async (dispatch) => {
  const payload = {
    status: false,
    id: null,
    username: null,
    theme: "light",
    editorTheme: "vs-dark",
  };

  try {
    const response = await loopit.get("/auth/verify");
    console.log(response.data);
    switch (response.data.status) {
      case "authorized":
        payload.status = true;
        payload.id = response.data.id;
        payload.username = response.data.username;
        payload.theme = response.data.theme;
        payload.editorTheme = response.data.editorTheme;
        break;
      default:
        break;
    }
    dispatch({
      type: "CHECK_USER_AUTH",
      payload,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_USER_AUTH",
      payload,
    });
  }
};

export const setHasData = () => {
  return {
    type: "SET_HAS_DATA",
  };
};

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await loopit.get("/users/me");
    dispatch({ type: "FETCH_USER", payload: response.data.me });
  } catch (error) {
    await loopit.get("/auth/logout");
    dispatch({ type: "FETCH_USER", payload: null });
  }
};

/**
 *
 * @param {string} collection Fetch from all, saved, created, search
 * @param {int} page Page number
 * @param {string} option Option to fetch from OPTIONAL
 * @param {string} value Value to fetch from OPTIONAL
 */
export const fetchLoops =
  (collection, page, option, value) => async (dispatch) => {
    let endpoint = "";
    const params = {
      limit: 10,
      page,
    };
    let action = "FETCH_LOOPS";

    if (collection === "all") {
      endpoint = "/loops/all";
    } else if (collection === "saved") {
      endpoint = "/users/saves";
      action = "FETCH_SAVED";
    } else if (collection === "created") {
      endpoint = `/loops/all?username=${value}`;
      action = "FETCH_CREATED";
    } else if (collection === "search") {
      endpoint = `/loops/all?${option}=${value}`;
      action = "FETCH_SEARCH";
    }

    try {
      const response = await loopit.get(endpoint, {
        params,
      });

      dispatch({ type: action, payload: response.data.loops });
    } catch (error) {
      console.log(error);
    }
  };

export const updateLoops = (collection, action, state, id) => {
  return {
    type: "UPDATE_LOOPS",
    payload: {
      action,
      collection,
      state,
      id,
    },
  };
};

export const clearSearch = () => {
  return {
    type: "CLEAR_SEARCH",
  };
};

export const switchTheme = () => {
  return {
    type: "SWITCH_THEME",
  };
};
