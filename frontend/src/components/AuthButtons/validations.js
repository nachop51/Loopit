const verifyEmail = (email) => {};

const verifyPassword = (password) => {
  return true;
};

export const verifyInput = (value) => {
  if (value.contains(" ")) {
    return false;
  }
  return true;
};

export const login = (username, password) => {
  if (!verifyEmail(username)) {
    console.log("Nope ASLKDH");
    return;
  }
  if (!verifyPassword(password)) {
    console.log("Nope");
    return;
  }
  console.log("IM LOGIN BITCH");
};

export const register = (email, username, password, confirmPassword) => {
  if (password !== confirmPassword) {
    console.log("Nope");
    return;
  }
  console.log("Yep");
};
