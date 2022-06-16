//insertar una linea a la tabla chat en este caso

const {knex}= require('./options/mariaDB')
const insert = (table, objeto)=>{
    knex(table).insert(objeto).then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { insert }