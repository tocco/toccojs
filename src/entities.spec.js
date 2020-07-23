import main from './main'
import * as usersData from './test/users'
import * as userData from './test/user'

main.initialize({
  host: 'http://localhost:8080'
})

const entities = main.entities()

describe('toccojs', () => {
  describe('entities', () => {
    afterEach(() => {
      fetch.resetMocks()
    })

    test('should list users', done => {
      fetch.mockResponse(JSON.stringify(usersData))
      entities.list('User').then(data => {
        expect(data.length).toBe(2)
        done()
      })
    })

    test('should list users on url', done => {
      fetch.mockResponse(JSON.stringify(usersData))
      entities.list('User').then(() => {
        const result = 'http://localhost:8080/nice2/rest/entities/2.0/User'
        const calledURL = fetch.mock.calls[0][0]
        expect(calledURL).toBe(result)
        done()
      })
    })

    test('should get user data', done => {
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

    test('should use paths in url', done => {
      fetch.mockResponse(JSON.stringify(userData))
      entities.get('User', '351', {
        paths: ['firstname', 'lastname']
      }).then(data => {
        if (data) {
          const result = 'http://localhost:8080/nice2/rest/entities/2.0/User/351?_paths=firstname,lastname'
          const calledURL = fetch.mock.calls[0][0]
          expect(calledURL).toBe(result)
          done()
        }
      })
    })
  })
})
