import EmailValidator from "email-validator";

export const validateUser = (username) => {
  if (!username) return "Username is required";
  let errors = "";
  if (validateEmail(username) === "") {
    return "";
  } else if (username.includes(" ")) {
    errors = "Username can't contain spaces";
  } else if (username[0] === "." || username[username.length - 1] === ".") {
    errors = "Username can't start or end with a dot";
  } else if (username.split(".").length > 2) {
    errors = "Username can't contain more than one dot";
  } else if (username.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/)) {
    errors = "Username can't have special characters";
  } else if (username.length < 4) {
    errors = "Username must be at least 4 characters";
  } else if (username.length > 20) {
    errors = "Username can't be longer than 20 characters";
  }
  return errors;
};

export const validateUserRegister = (username) => {
  if (!username) return "Username is required";
  let errors = "";
  if (username.includes(" ")) {
    errors = "Username can't contain spaces";
  } else if (username[0] === "." || username[username.length - 1] === ".") {
    errors = "Username can't start or end with a dot";
  } else if (username.split(".").length > 2) {
    errors = "Username can't contain more than one dot";
  } else if (username.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/)) {
    errors = "Username can't have special characters";
  } else if (username.length < 4) {
    errors = "Username must be at least 4 characters";
  } else if (username.length > 20) {
    errors = "Username can't be longer than 20 characters";
  }
  return errors;
};

export const validateFullname = (fullname) => {
  if (!fullname) return "Fullname is required";
  let errors = "";
  const nameSplited = fullname.split(" ");
  const lenghts = nameSplited.filter((name) => name.length < 2);
  if (nameSplited.length <= 1) {
    errors = "Missing last name";
  } else if (lenghts.length > 0) {
    errors = "Names must be at least 2 characters";
  } else if (fullname.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) {
    errors = "Fullname can't have special characters";
  } else if (fullname.match(/[0-9]/)) {
    errors = "Fullname can't have numbers";
  }
  return errors;
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  let errors = "";
  if (!EmailValidator.validate(email)) {
    errors = "Email is not valid";
  }
  return errors;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  let errors = "";
  if (password.includes(" ")) {
    errors = "Password can't contain spaces";
  } else if (password.length < 7) {
    errors = "Password must be at least 7 characters";
  } else if (!password.match(/[A-Z]/)) {
    errors = "Password must contain at least one uppercase letter";
  } else if (!password.match(/[a-z]/)) {
    errors = "Password must contain at least one lowercase letter";
  } else if (!password.match(/[0-9]/)) {
    errors = "Password must contain at least one number";
  }
  return errors;
};

export const validatePasswordConfirmation = (confirmation, { pass }) => {
  if (!confirmation) return "Password confirmation is required";
  let errors = "";
  if (confirmation !== pass) {
    errors = "Password confirmation doesn't match";
  }
  return errors;
};
