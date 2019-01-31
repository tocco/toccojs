import * as fetchFns from './fetch'
import * as usersData from '../test/users'
import {testApp} from '../test/testApp'


describe('toccojs', () => {
  describe('util', () => {
    describe('fetch', () => {
      afterEach(() => {
        fetch.resetMocks()
      })

      test('should extractAndStoreSessionId', () => {
        const response = {headers: new Map()}
        response.headers.set('set-cookie', global.testResponseString)

        fetchFns.extractAndStoreSessionId(global, response)
        const sessionId = global.testSessionId
        expect(fetchFns.sessionIds[global.username]).toBe(sessionId)
      })

      test('should return emtpy string on empty call', () => {
        const queryString = fetchFns.buildQueryString()
        expect(queryString).toBe('')
      })

      test('should return queryString', () => {
        const params = { _paths: 'firstname,lastname' }
        const result = '?_paths=firstname,lastname'
        const queryString = fetchFns.buildQueryString(params)
        expect(queryString).toBe(result)
      })

      test('should return queryString with _paths array', () => {
        const params = { _paths: ['firstname,lastname', 'firstname2,lastname2'] }
        const result = '?_paths=firstname,lastname&_paths=firstname2,lastname2'
        const queryString = fetchFns.buildQueryString(params)
        expect(queryString).toBe(result)
      })

      test('should buildUrl', () => {
        const basePath = 'http://localhost:8080/nice2/rest'
        const path = '/entities/User/351'
        const queryParams = { _paths: 'firstname,lastname' }
        const result = 'http://localhost:8080/nice2/rest/entities/User/351?_paths=firstname,lastname'
        const url = fetchFns.buildUrl(basePath, path, queryParams)
        expect(url).toBe(result)
      })

      test('should initialize app', async () => {
        fetch.mockResponse(JSON.stringify(usersData))
        const path = '/entities/User'
        const options = {}
        const response = await fetchFns.initialize(testApp)(path, options)
        expect(response.data.length).toBe(2)
      })

      test('should get auth response string on initialization', async () => {
        fetch.mockResponse(JSON.stringify(usersData))
        const path = '/entities/User'
        const options = {}
        await fetchFns.initialize(testApp)(path, options)
        expect(fetch.mock.calls[0][1].headers.cookie).toBe('nice_auth=' + global.testSessionId)
      })
    })
  })
})
