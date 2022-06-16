let faker = require('faker')
faker.locale= 'es'

class ApiProductosMock {
    constructor(){

    }
    aleatorio(){
        return {
            nombre:faker.name.findName(),
            precio:faker.random.number(),
            foto:faker.image.image()

        }
    }
}
module.exports={ApiProductosMock}