//insertar una linea a la tabla chat en este caso

const {options}= require('./options/sqlite3')
const insertMessage = (table, objeto)=>{
    options(table).insert(objeto).then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { insertMessage3 }