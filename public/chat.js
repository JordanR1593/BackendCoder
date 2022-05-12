const socket = io.connect();

// --------------------
function renderChat(data) {
  const html = data.map((elem) => {
      let fecha=  new Date();

      let dia = fecha.getDate();
      let año = fecha.getFullYear();
      let mes = (fecha.getMonth()+ 1);

      let hora = fecha.getHours() + ":";
      let minutos = fecha.getMinutes() + ":";
      let segundos = fecha.getSeconds() ;

      return `<div>
            <strong><h5>${elem.name}:</h5><h6>Menssage sent on ${dia}/${mes}/${año} Time: ${hora}${minutos}${segundos}</h6></strong>
            <p><em>${elem.mensaje}</em></p>
        </div>`;
    })
    .join(" ");

  document.getElementById("filaTexto").innerHTML = html;
}
function addMessagechat() {
  
  const mensaje = {
    
    name: document.getElementById("username").value,

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