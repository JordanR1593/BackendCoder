
import * as model from './model/SchemaLogin.js'
 

async function getChat(){
    
    try{

        console.log('GET');
        
        const chat = await model.chats.find();
        console.log(chat);

    } catch (error) {
        console.log(`'Error en el GetChat: ${error}`);
    }
}

export {getChat}