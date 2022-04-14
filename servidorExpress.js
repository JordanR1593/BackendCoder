const fs= require("fs")


class Productos {
    constructor(){
        this.nombreArchivo=`./productos.json`;
        this.id=1
}

    save(nombre,precio){
        let usuario= {nombre:nombre,precio:precio,id:this.id}
        let usuarios=[]
    try {
        let file = fs.readFileSync(this.nombreArchivo,'utf-8')
        usuarios=JSON.parse(file)
    } catch (error) {
        console.log('No hay archivo')
    }
    usuarios.push(usuario)
        this.id++
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(usuarios))
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
        let usuarios=[]
        try {
            let file = fs.readFileSync(this.nombreArchivo,'utf-8')
            usuarios=JSON.parse(file)
        } catch (error) {
            console.log('No hay archivo')
        }
        return usuarios
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
const app=express()
const router = Router()
const  PORT=8080
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

function Middleware1(req,res,next){
    req.nameProduct=document.getElementById("nameProduct").value
    req.priceProduct=document.getElementById("priceProduct").value
    next()
}
app.post('/',Middleware1, (req,res)=>{
    let nameProduct=req.nameProduct
    let priceProduct=req.priceProduct
    
    items.save(nameProduct,priceProduct)
    res.json(JSON.stringify(items.getById(usuarios.length-1)))
})
router.put('/productos', (req,res)=>{
    
})
router.delete('/productos', (req,res)=>{
    
})
app.use('/api',router)

app.get("/",function(req,res){
    res.sendFile(__dirname + '/public/index.html')
})
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads")
    },
    filename: function (req,file,cb){
        cb(null, file.fieldname +'-'+Date.now())
    }
})
var upload = multer({storage:storage})
/* app.post('/uploadfile', upload.single('myfile'),(req,res,next)=>{
    const file =req.file
    if(!file){
        const error=new Error("cargue algun archivo")
        error.httpStatusCode=400
        return next(error)
    }
    res.send(file)
}) */
