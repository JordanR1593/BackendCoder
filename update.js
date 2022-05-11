
const {knex}= require('./options/mariaDB')
const updateMessage = (table, id, objeto)=>{
    knex(table).where({id:1}).update(objeto).then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
insertMessage('chat',{name:"alejo",mensaje:"que hay"})