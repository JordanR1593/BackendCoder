
import * as model from './model/chat.js'
 

async function deleteChat(){
    
    try{

        console.log('DELETE');
        
        const chatdeleted = await model.chats.deleteOne(
            {apellido:'cardona'},
            
        );
        console.log(chatdeleted);

    } catch (error) {
        console.log(`'Error en el GetChat: ${error}`);
    }
}

export {deleteChat}