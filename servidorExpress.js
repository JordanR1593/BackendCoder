
const {contenedor}= require('./contenedor/productos')

const handlebars = require('express-handlebars');
const router = require('./routes/routeProducto')
const MongoStore = require('connect-mongo')





//----------------

let items= new contenedor()
let getAll= items.get('producto') 






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


app.use(session({
  store:MongoStore.create({mongourl:'mongodb://localhost/sesiones'}),
  secret:'coderhouse',
  resave:false,
  saveUninitializeed:false
}))












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




  

httpServer.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}`)

})