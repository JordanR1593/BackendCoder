
const {knex}= require('./options/mariaDB')
const get = (tabla)=>{
    knex(tabla).select('*').then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { get }