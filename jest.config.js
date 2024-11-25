/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "backend", // Backend folder relative to the Jest config file
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^(\\.{1,2}/.*)\\.(ts|js)$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "backend"], // Resolve from backend/src
};
