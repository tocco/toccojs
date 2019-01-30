module.exports = {
  clearMocks: true,
  globals: {
    username: 'testUser123',
    password: 'testPassword123',
    host: 'http://localhost:8080',
    testResponseString: 'nice_auth=df123456-ff12-12b3-aea1-1e2df3c45fad;Path=/;Expires=Mon,' +
      ' 28-Jan-2019 11:12:04 GMT;Max-Age=1800;HttpOnly, JSESSIONID=node1heb2ponpc3dq1ugew4i5mfdox678.node0;Path=/',
    testSessionId: 'df123456-ff12-12b3-aea1-1e2df3c45fad'
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
