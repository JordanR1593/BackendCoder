const express = require('express');
const PORT = 8080;
const app = express();


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





app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/Productos', function (req, res) {
    
    res.render('Productos.pug', {mensaje: getAll});    
})


app.get('/GuardarProductos', function (req, res) {
    //let saludo = req.query.saludo;
    res.render('GuardarProdcutos.pug', req.query);    
})









const server = app.listen(PORT, () => {
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});