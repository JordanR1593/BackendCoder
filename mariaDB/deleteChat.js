
import * as model from './model/SchemaLogin.js'
 

async function deleteChat(){
    
    try{

        console.log('DELETE');
        
        const chatdeleted = await model.chats.deleteMany(
            {apellido:'cardona'},
            
        );
        console.log(chatdeleted);

    } catch (error) {
        console.log(`'Error en el GetChat: ${error}`);
    }
}

export {deleteChat}