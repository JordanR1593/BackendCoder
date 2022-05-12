
const {options}= require('./options/sqlite3')
const updateMessage = (table, id, objeto)=>{
    options(table).where({id:1}).update(objeto).then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports= {updateMessage3}