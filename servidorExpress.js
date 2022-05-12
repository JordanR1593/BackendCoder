
const handlebars = require('express-handlebars');
const {createTable} = require('./mariaDB/createTable')
const {insertMessage} = require('./mariaDB/insert')
const {getMessage} = require('./mariaDB/get')

const {update} = require('./mariaDB/update')
const {deleter}=require('./mariaDB/delete')
//---
const {createTable3} = require('./sqlite3/createTable')
const {insertMessage3} = require('./sqlite3/insert')
const {getMessage3} = require('./sqlite3/get')

const {update3} = require('./sqlite3/update')
const {deleter3}=require('./sqlite3/delete')


class contenedor{
    constructor(){
        
    }
    createTable(){
        createTable3()
    }
    
    getMessage(tabla){
        getMessage3(tabla)
    }
    insertMessage(table,nombre,mensaje){
        insertMessage3(table,nombre,mensaje)
    }
    deleter(){
        deleter3()
    }
    update(table,id,objeto){
        update(table,id,objeto)
    }
}

//----------------

let items= new contenedor()
let getAll= items.getMessage3('producto') 



class Chat {

    constructor(){
        
    }

    insertMessage(table,objeto){
        insertMessage(table,objeto)
    }
    getMessage(tabla){
        getMessage(tabla)
    }
     
}

let chats= new Chat()
let getChat= chats.getMessage('chat')
let inserter=(table,objeto)=>{
    chats.insertMessage(table,objeto)}
let updater= chats.update(table,id,objeto)
const express = require("express");
const {Server:HttpServer}=require("http");
const {Server:IOServer}= require("socket.io");



const app=express();
const httpServer= new HttpServer(app);
const io=new IOServer(httpServer);
app.use(express.static('./public'))

const  PORT=8080
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))













app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function (req, res) {
    console.log("hola")
    
   res.render("main");    
})
app.get("/chat", function (req, res) {
    res.render("chat");
  });


  io.on("connection", (socket) => {
    console.log("Usuario conectado");
    
    socket.emit('products',getMessage)
    
    socket.on("new-product", data=>{
        
        getAll.push(data)
        console.log(get('chat'))
        socket.emit("products",getChat)
    })
  
    socket.emit("chat", getChat);
  
    socket.on("newChat", (data) => {
      Date(data)
      console.log("hola")
      inserter("chat",data);
      socket.emit("chat", getChat);
    });
  });

httpServer.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}`)

})