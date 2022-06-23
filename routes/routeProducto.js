var Router       = require('router')

const express = require("express");
const {Server:HttpServer}=require("http");
const {Server:IOServer}= require("socket.io");



const app=express();
const httpServer= new HttpServer(app);
const io=new IOServer(httpServer);


const router = Router();
router.get('/login', function (req, res) {
    console.log("hola")
    const {username} = req.query
    res.render("main");



    io.on("connection", (socket) => {
      console.log("Usuario conectado");
      
      socket.emit('products',getMessage)
      
      socket.on("new-product", data=>{
          
          getAll.push(data)
          console.log(get('chat'))

          if(data !==username){
            return res.send('usuario incorrecto')
          }
          req.session.user= username
          req.session.admin=true



          socket.emit("products",getChat)
      })
    
      
    
      
    });

    

      
})

function checkAuth(req, res, next){
    if(req.session?.user === username && req.session?.admin){
      return next()
    }
    return res.status(401).send('Usted no tiene permisos')

}

router.get('/logout', function (req, res) {
  console.log("hola")
  req.session.destroy(error=>{
    if(error){
      res.send({status: 'logout error', body:error})
    }
  })
  res.send("Usted ha cerrado sesion")
 res.render("main copy");    
})


router.get('/', function (req, res) {
  console.log("hola")
  
 res.render("main copy");    
})


  module.exports = router