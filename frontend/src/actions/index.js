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

    if (collection === "all") {
      endpoint = "/loops/all";
    } else if (collection === "saved") {
      endpoint = "/users/saves";
    } else if (collection === "created") {
      endpoint = `/loops/all?username=${value}`;
    } else if (collection === "search") {
      endpoint = `/loops/all?search=${value}`;
    }

    console.log(collection, page, option, value);

    try {
      const response = await loopit.get(endpoint, {
        params,
      });

      dispatch({ type: "FETCH_LOOPS", payload: response.data.loops });
    } catch (error) {
      console.log(error);
    }
  };

export const clearLoops = () => {
  return {
    type: "CLEAR_LOOPS",
  };
};

export const switchTheme = () => {
  return {
    type: "SWITCH_THEME",
  };
};
