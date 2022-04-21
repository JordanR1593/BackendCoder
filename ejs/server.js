const express = require('express');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.set('views', './views');
app.set('view engine', 'ejs');


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
    

    res.render('pages/index', {mascots: getAll});    
})

app.get('/about', function (req, res) {
    res.render('pages/about');    
})


const server = app.listen(PORT, () => {
    console.log("Aplicacion express escuchando en el puerto " + server.address().port);
});