
import * as model from './model/SchemaLogin.js'
 

async function createChat(){
    
    try{

        console.log('Create');
        const chat= {
            nombre:'juan',
            apellido:"Rua",
            edad:12,
            alias:"jua",
            text:'Hola, como estas?'
        };
        const chatSaveModel = new model.chats(chat);
        let chatSave=await chatSaveModel.save();
        console.log(chatSave);

    } catch (error) {
        console.log(`'Error en el createTable: ${error}`);
    }
}

export {createChat}