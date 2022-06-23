import mongoose from 'mongoose';

const chatCollection = 'chat';

const ChatSchema = new mongoose.Schema({
    
    nombre:{type:String,required:true},
    
})

export const chats = mongoose.model(chatCollection,ChatSchema)