
const {knex}= require('./options/mariaDB')
const getMessage = (tabla)=>{
    knex(tabla).select('*').then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { getMessage }