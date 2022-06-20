
import * as model from './model/chat.js'
 

async function getChatById(valor){
    
    try{

        console.log('GETBYID');
        
        const chat = await model.chats.find({apellido:`${valor}`});
        console.log(chat);

    } catch (error) {
        console.log(`Error en el GetChatById: ${error}`);
    }
}

export {getChatById}