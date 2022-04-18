const fs= require("fs")


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
        let usuarios=[]
        
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            usuarios=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        usuarios.forEach(user => {
        if(user.id=!id){
            usuarios.push(user)
            
        }
        
    });
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(usuarios))
    
    }
     
}

let items= new Productos()
let getAll= items.getAll()
const randomNumber=(getAll)=>{
    
    
    let randomNumber= Math.floor(Math.random() * (getAll.length+1) )
    randomNumber>0?randomNumber=randomNumber:randomNumber=1
    let getById= items.getById(randomNumber)
    console.log(randomNumber)
    return (JSON.stringify(getById))
}


 
const express = require("express");
const {Router}=express
const multer=require("multer")
const bodyParser = require('body-parser')
const app=express()
const router = Router()
const  PORT=8080
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
const server= app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)

})
server.on("error", error=> console.log(`Error en servidor ${error}`))
app.get("/productos",(req,resp)=>{
    resp.send(JSON.stringify(getAll))
})
app.get("/productosRandom",(req,resp)=>{
    resp.send(randomNumber(getAll))
})
router.get('/productos', (req,res)=>{
    res.send(JSON.stringify(getAll))
})

router.get('/productos/:id', (req,res)=>{
    if (items.getById(req.params.id)==null){
        throw error
        
    }else{
        res.send(JSON.stringify(items.getById(req.params.id)))
    }
    
})
router.use(function(err,req,res,next){
        console.error(err.stack)
    res.status(500).send("El producto no encontrado")
})



router.put('/productos', (req,res)=>{
    let nameProduct = req.body.nameProduct1
    let priceProduct= req.body.priceProduct1
    let idProduct= req.body.idProduct
    console.log("esto es"+nameProduct+ priceProduct+ idProduct)
    let modificacionProducto=items.editById(idProduct,nameProduct,priceProduct)
    res.send(JSON.stringify(modificacionProducto))
})
app.delete('/productos/:id', (req,res)=>{
    items.deleteById(req.params.id)
    res.send(JSON.stringify(items.getAll()))
})
app.use('/api',router)

router.get("/",function(req,res){
    res.sendFile(__dirname + '/public/index.html')
})
/* var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads")
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname +'-'+Date.now())
    }
})
var upload = multer({storage:storage}) */
router.post('/productos',(req,res)=>{
    let nameProduct = req.body.nameProduct
    let priceProduct= req.body.priceProduct
    items.save(nameProduct,priceProduct)
    res.send(JSON.stringify(items.getAll()))
}) 
