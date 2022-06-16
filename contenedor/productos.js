const {createTable} = require('../mariaDB/createTable')
const {insert} = require('../mariaDB/insert')
const {get} = require('../mariaDB/get')

const {update} = require('../mariaDB/update')
const {deleter}=require('../mariaDB/delete')


class contenedor{
    constructor(){
        
    }
    create(){
        return createTable()
    }
    
    get(tabla){
        return get(tabla)
    }
    insert(table,nombre,mensaje){
        return insert(table,nombre,mensaje)
    }
    deleter(){
        return deleter()
    }
    update(table,id,objeto){
        return update(table,id,objeto)
    }
}

module.exports= {contenedor}