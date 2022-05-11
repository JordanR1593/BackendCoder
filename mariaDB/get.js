
const {knex}= require('./options/mariaDB')
const getMessage = (table)=>{
    knex(table).select('*').then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { getMessage }