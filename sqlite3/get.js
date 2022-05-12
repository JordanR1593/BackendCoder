
const {options}= require('./options/sqlite3')
const getMessage = (tabla)=>{
    options(tabla).select('*').then(data=>{console.log(data)}).catch(err=>{console.log(err)})
}
module.exports = { getMessage3 }