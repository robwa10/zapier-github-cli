module.exports = {
  extends: ["./src/config/eslint.js"],
  env: { node: true },
  rules: {
    "no-process-exit": "off"
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { jest: true, jasmine: true }
    }
  ]
};
