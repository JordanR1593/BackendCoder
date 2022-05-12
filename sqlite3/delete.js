
const {options}= require('./options/sqlite3')
const deleteMessage = (table,id)=>{
    options(table).where({id:id}).del().then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}


module.exports = { deleteMessage3}