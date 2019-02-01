const tocco = require('../../dist/toccojs.umd')

tocco.initialize({
    host: 'http://localhost:8080'
})

const entities = tocco.entities()

entities.list('User').then(data => {
    console.log(data.length + ' Users received as anonymous')
})

tocco.setCredentials({
    username: 'XXX',
    password: 'XXX',
})

tocco.setBusinessUnit('test1')

entities.list('User').then(data => {
    console.log(data.length + ' Users received with user XXX')
})

entities.get('User', '351', {
    paths: ['firstname', 'lastname']
}).then(data => {
    if (data) {
        const text = `User 351 received (first name: ${data.paths.firstname.value.value})`
        console.log(text)
    } else {
        console.log('User 351 not found')
    }
})
