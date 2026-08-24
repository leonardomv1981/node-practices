const dotenv = require("dotenv");
const nextJest = require("next/jest");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: ".",
});
const resolveJestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testTimeout: 60000,
});

module.exports = async () => {
  const jestConfig = await resolveJestConfig();

  // `cookie` ships as ESM-only (no CommonJS build), so it needs to be
  // included in next/jest's default node_modules transform exceptions.
  jestConfig.transformIgnorePatterns = jestConfig.transformIgnorePatterns.map(
    (pattern) => pattern.replace("(geist|", "(cookie|geist|"),
  );

  return jestConfig;
};
