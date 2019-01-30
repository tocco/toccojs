module.exports = {
  clearMocks: true,
  globals: {
    username: 'tocco',
    password: 'neis-218-toggo',
    host: 'http://localhost:8080',
    testResponseString: 'nice_auth=df6a9a18-ff99-43b8-aea6-7e7df7c35fad;Path=/;Expires=Mon, 28-Jan-2019 11:12:04 GMT;Max-Age=1800;HttpOnly, JSESSIONID=node0heb0ponpc9dq1ugew3i3mfdox103.node0;Path=/',
    testSessionId: 'df6a9a18-ff99-43b8-aea6-7e7df7c35fad'
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
