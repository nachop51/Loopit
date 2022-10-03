import EmailValidator from "email-validator";

const verifyUser = (username) => {
  if (username.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/)) return false;
  if (username[0] === "." || username[username.length - 1] === ".")
    return false;
  if (username.includes(" ")) return false;
  return username.length > 3;
};

const verifyPassword = (password) => {
  if (password.includes(" ")) return false;
  if (password.length < 7) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/[0-9]/)) return false;
  if (!password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) return false;
  return true;
};

export const validateLogin = (username, password) => {
  const errors = [];
  if (!EmailValidator.validate(username) && !verifyUser(username))
    errors.push("email");
  if (!verifyPassword(password)) errors.push("password");
  return errors;
};

export const validateRegister = (
  email,
  username,
  password,
  confirmPassword
) => {
  const errors = [];
  if (!EmailValidator.validate(email)) errors.push("email");
  if (!verifyUser(username)) errors.push("username");
  if (!verifyPassword(password)) errors.push("password");
  return errors;
};
