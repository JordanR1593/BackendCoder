
import * as model from './model/SchemaLogin.js'
 

async function updateChat(){
    
    try{

        console.log('UPDATE');
        
        const chatUpdate = await model.chats.updateOne(
            {nombre:'juan'},
            {$set:{apellido:'cardona'}}
        );
        console.log(chatUpdate);

    } catch (error) {
        console.log(`'Error en el GetChat: ${error}`);
    }
}

export {updateChat}