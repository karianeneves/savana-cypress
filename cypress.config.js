const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    env: { apiUrl: "http://localhost:3000" },
    video: true,
    screenshotOnRunFailure: true,
  },
});