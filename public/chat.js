const socket = io.connect();
const{schema,nomalize, normalize} =require('normalizr')
// --------------------
function renderChat(data) {

  const authorSchema = new schema.Entity('authors')
  const mensajeSchema= new schema.Entity('mensajes')
  const postSchema= new schema.Entity('post')
  const chatSchema= new schema.Entity('data',{
   author:authorSchema,
   posts: [postSchema],
   mensaje: [mensajeSchema]
  })
  const normalizeChat= normalize(data, chatSchema)


  const html = normalizeChat.map((elem) => {
      let fecha=  new Date();

      let dia = fecha.getDate();
      let año = fecha.getFullYear();
      let mes = (fecha.getMonth()+ 1);

      let hora = fecha.getHours() + ":";
      let minutos = fecha.getMinutes() + ":";
      let segundos = fecha.getSeconds() ;

      
    
     

      return `<div>
            <strong><h5>${elem.author}:</h5><h6>Menssage sent on ${dia}/${mes}/${año} Time: ${hora}${minutos}${segundos}</h6></strong>
            <p><em>${elem.mensaje}</em></p>
        </div>`;
    })
    .join(" ");

  document.getElementById("filaTexto").innerHTML = html;
}
function addMessagechat() {
  
  const mensaje = {
    
    name: document.getElementById("name").value,
    apellido: document.getElementById("apellido").value,
    edad: document.getElementById("edad").value,
    alias: document.getElementById("alias").value,
    email: document.getElementById("username").value,

    mensaje: document.getElementById("texto").value,
  };
console.log(mensaje)
  socket.emit("newChat", mensaje);
  return false;
}
socket.on("chat", (data) => {
  console.log(data)
  renderChat(data);
});