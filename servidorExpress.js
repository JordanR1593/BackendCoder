const fs= require("fs")
const handlebars = require('express-handlebars');
const chat = [];
class Productos {
    constructor(){
        this.nombreArchivo=`./productos.json`;
        this.id=0
}

    save(nombre,precio){
       
        let productos=[]
    try {
        let file = fs.readFileSync(this.nombreArchivo,'utf-8')
        productos=JSON.parse(file)
    } catch (error) {
        console.log('No hay archivo')
    }
    productos.length>0?this.id=productos.length+1:this.id=1
    let producto= {nombre:nombre,precio:precio,id:this.id}
   
    productos.push(producto)
    
            
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
}

    getById(id){
        let usuarios=[]
        let usuario=null
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            usuarios=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id==id){
            usuario=user
        }
    });
    return usuario
    }
     getAll(){
        let productos=[]
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            productos=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        return productos
     }
     editById(id,nombre,precio){
        let usuarios=[]
        let usuario=null
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            usuarios=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id==id){
            usuario=user
            usuario.nombre=nombre
            usuario.price=precio
        }
    });
    return usuarios
    }
    deleteById(id){
        let users=[]
        let usuarios=[]
        
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            usuarios=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id!=id){
            users.push(user)
            
        }
        
    });
    return users
    
    }
     
}
//----------------

let items= new Productos()
let getAll= items.getAll()



class Chat {

    constructor(){
        this.nombreArchivo=`./historial.txt`;
        this.id=0
    }

    saveChat(nombre,precio){
       
        let productos=[]
    try {
        let file = fs.readFileSync(this.nombreArchivo,'utf-8')
        productos=JSON.parse(file)
    } catch (error) {
        console.log('No hay archivo')
    }
    productos.length>0?this.id=productos.length+1:this.id=1
    let producto= {usuario:nombre,text:precio}
   
    productos.push(producto)
    
            
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(productos))
}
getChat(){
        let productos=[]
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            productos=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        return productos
     }
}

let chats= new Chat()
let getChat= chats.getChat()

 chats.saveChat("juan","texto")
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









io.on("connection", (socket) => {
    console.log("Usuario conectado");
    socket.emit('products',getAll)
    console.log(getAll)
    socket.on("new-product", data=>{
        
        getAll.push(data)
        console.log(getAll)
        socket.emit("products", getAll)
    })
  
    socket.emit("chat", getChat);
  
    socket.on("newChat", (data) => {
      Date(data)
      
      getChat.push(data);
      socket.emit("chat", getChat);
    });
  });


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

/* app.post('/', function (req, res) {
    let nameProduct = req.body.nameProduct
    let priceProduct = req.body.priceProduct
    console.log(nameProduct,priceProduct)
    

    io.on('submit',(socket)=>{
    
        socket.emit('products',getAll)
    })
    
}) */


httpServer.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}`)

})