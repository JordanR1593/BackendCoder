import mongoose from 'mongoose';

const chatCollection = 'chat';

const ChatSchema = new mongoose.Schema({
    
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    edad:{type:Number,required:true},
    alias:{type:String,required:true},
    avatar:{type:Object},
    text:{type:String,required:true}
})

export const chats = mongoose.model(chatCollection,ChatSchema)