
const {contenedor}= require('./contenedor/productos')
const {Chat} =require('./contenedor/mensaje')
const handlebars = require('express-handlebars');
const router = require('./routes/routeProducto')
const routerChat = require('./routes/chat')





//----------------

let items= new contenedor()
let getAll= items.get('producto') 





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
app.use('/api/productos-test',router)
app.use('/api/chat',routerChat)











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