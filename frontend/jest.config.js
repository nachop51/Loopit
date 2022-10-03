/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  // testEnvironment2: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|jpg|jpeg|png)$": "identity-obj-proxy",
  },
};
