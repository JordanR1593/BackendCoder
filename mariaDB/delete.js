
const {knex}= require('./options/mariaDB')
const deleteMessage = (table,id)=>{
    knex(table).where({id:id}).del().then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}


module.exports = { deleteMessage}