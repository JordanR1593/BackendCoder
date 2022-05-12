const {options} = require('./options/sqlite3')
const createTable = async config =>{
    await options.schema.withSchema('chat').createTable('chat', table =>{
        table.string('name');
        table.integer('id');
        table.string('mensaje')

    })
}

module.exports= {createTable3}