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

const validateFullname = (fullname) => {
  const nameSplited = fullname.split(" ");
  if (nameSplited.length <= 1) return false;
  const lenghts = nameSplited.filter((name) => name.length < 2);
  if (lenghts.length > 0) return false;
  if (fullname.length < 1) return false;
  if (fullname.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)) return false;
  if (fullname.match(/[0-9]/)) return false;
  return true;
};

export const validateLogin = (username, password) => {
  if (!EmailValidator.validate(username) && !verifyUser(username)) return true;
  if (!verifyPassword(password)) return true;
  return false;
};

export const validateRegister = (
  fullname,
  username,
  email,
  password,
  confirm
) => {
  const errors = [];
  if (!validateFullname(fullname)) errors.push("fullname");
  if (!verifyUser(username)) errors.push("username");
  if (!EmailValidator.validate(email)) errors.push("email");
  if (!verifyPassword(password)) errors.push("password");
  if (confirm === "" || password !== confirm) errors.push("confirm");
  return errors;
};
