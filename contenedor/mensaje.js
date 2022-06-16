const {insert} = require('../mariaDB/insert')
const {get} = require('../mariaDB/get')

class Chat {

    constructor(){
        
    }

    insertMessage(table,objeto){
        return insert(table,objeto)
    }
    getMessage(tabla){
        return get(tabla)
    }
     
}
module.exports= {Chat}
