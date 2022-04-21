const express = require('express');
const app = express();
const PORT = 8080;
const handlebars = require('express-handlebars');


let get=()=>{
    app.engine(
        "hbs", 
        handlebars.engine({
            extname: ".hbs",
            defaultLayout: 'index.hbs',
            layoutsDir: __dirname + "/views/layouts",
            partialsDir: __dirname + "/views/partials/"
        })
    );
}


let post =()=>{
    app.engine(
        "hbs", 
        handlebars.engine({
            extname: ".hbs",
            defaultLayout: 'index.hbs',
            layoutsDir: __dirname + "/views/layouts",
            partialsDir: __dirname + "/views/partials/"
        })
    );
}


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"));



const fs= require("fs")


class Productos {
    constructor(){
        this.nombreArchivo="./productos.json";
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
getAll(){
    let productos=[]
    try {
        let file = fs.readFileSync(this.nombreArchivo,'utf-8')
        productos=JSON.parse(file)
    } catch (error) {
        console.log('No hay archivo')
    }
    return productos
 }}
 let items= new Productos()
 let getAll= items.getAll()


 app.get('/', function (req, res) {
    get()
   res.render('main', { suggestedChamps: getAll, listExists: true });    
})


 app.get('/Productos', function (req, res) {
     console.log("hola")
     get()
    res.render('main', { suggestedChamps: getAll, listExists: true });    
})

app.get('/GuardarProducto', function (req, res) {
    post()
    res.render('second', { suggestedChamps: getAll, listExists: true });    
})
app.post('/Productos', function (req, res) {
    
    let nameProduct = req.body.nameProduct
    let priceProduct= req.body.priceProduct
    items.save(nameProduct,priceProduct)
    let item=JSON.stringify(items.getAll())
    get()
    res.render('main', { suggestedChamps: item, listExists: true });    
})



const server = app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`);
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});