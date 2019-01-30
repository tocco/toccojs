import main from './main'
import * as usersData from './test/users'
import * as userData from './test/user'

main.initialize({
  host: 'http://localhost:8080'
})

main.setCredentials({
  username: global.username,
  password: global.password,
})

const entities = main.entities()

describe('toccojs', () => {
  describe('entities', () => {
    afterEach(() => {
      fetch.resetMocks()
    })

    test('should list logged-in users', done => {
      fetch.mockResponse(JSON.stringify(usersData))
      entities.list('User').then(data => {
        expect(data.length).toBe(2)
        expect(fetch.mock.calls[0][1].headers['X-Business-Unit']).toBe('__n-u-l-l__')
        done()
      })
    })

    test('should get specific user data', done => {
      fetch.mockResponse(JSON.stringify(userData))
      entities.get('User', '351', {
        paths: ['firstname', 'lastname']
      }).then(data => {
        if (data) {
          const key = data.key
          expect(key).toBe('351')
          done()
        }
      })
    })

    test('should log in with business unit', async () => {
      fetch.mockResponse(JSON.stringify(userData))
      main.setBusinessUnit('test2')
      await entities.list('User')
      expect(fetch.mock.calls[0][1].headers['X-Business-Unit']).toBe('test2')
    })
  })
})
