const mongoose = require('mongoose');
//const {MONGO_URI}=require('../config/globals');
const dotenv= require('dotenv')
dotenv.config()
const url=process.env.MONGO_URI

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, ()=>console.log('Conected'))

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName:{type:String,max:100},
    lastName:{type:String,max:100},
    email:{type:String,max:100},
    username:{type:String,max:100},
    password:{type:String,max:100}
})

module.exports= mongoose.model(usuariosCollection,UsuarioSchema)