const {knex} = require('./options/mariaDB')
const createTable = async config =>{
    await knex.schema.withSchema('chat').createTable('chat', table =>{
        table.string('name');
        table.integer('id');
        table.string('mensaje')

    })
}

module.exports= {createTable}