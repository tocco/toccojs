module.exports = {
  clearMocks: true,
  globals: {
    username: 'testUser123',
    apiKey: 'testPassword123',
    host: 'http://localhost:8080'
  },
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  verbose: true,
  "automock": false,
  "setupFiles": [
    "./setupJest.js"
  ]
}
