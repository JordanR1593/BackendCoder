import mongoose from 'mongoose'
import {createChat} from './createChat.js'
import {getChat} from './getChat.js'
import {updateChat} from './updateChat.js'
import {getChatById} from './getChatById.js'
import {deleteChat} from './deleteChat.js'
 
CRUD()
async function CRUD(){
    try {
        const URL = 'mongodb://localhost:27017/ecommerce';
        let rta= await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Base de datos conectada')


        //////////////CREATE///////////////////
        //createChat()

        //////////////GETBYID///////////////////
        //getChatById("cardona")

        //////////////GETALL///////////////////
        //getChat()

        //////////////UPDATE///////////////////
        //updateChat()

        //////////////DELETE///////////////////
        deleteChat()
        
    } catch (error) {
        console.log(`'Error en el CRUD: ${error}`);
    }
}