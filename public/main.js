const socket=io.connect()
const ApiProductosMock = require('../api/productos')
const apiProductos = new ApiProductosMock()
function addNew(e){
    
    const newProduct = {
        
        nombre: apiProductos.aleatorio.nombre ,
        precio: apiProductos.aleatorio.precio,
        imagen: apiProductos.aleatorio.image
    }
    socket.emit("new-product", newProduct)
    return false
}

function render(data){
    const html = data.map((elem,index)=>{
        return (
            `<div>
            <strong>${elem.nombre}</strong>
            <em>${elem.precio}</em>
            <img src="${elem.imagen}">
            
            </div>`
        )
    }).join(" ")
    document.getElementById("messages").innerHTML= html
}


socket.on('products', data=>{
    
    render(data)
})
