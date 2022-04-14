const http= require("http");
const server=http.createServer((req,resp)=>{
    resp.end("Hola mundo")
})
const connectedServer= server.listen(8080,()=>{
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})