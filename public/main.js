const socket=io.connect()

function addNew(e){
    
    const newProduct = {
        
        nombre: document.getElementById("nameProduct").value ,
        precio: document.getElementById("priceProduct").value 
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
            
            </div>`
        )
    }).join(" ")
    document.getElementById("messages").innerHTML= html
}


socket.on('products', data=>{
    
    render(data)
})
