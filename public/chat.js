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
            <strong><h5>${elem.usuario}:</h5><h6>Menssage sent on ${dia}/${mes}/${año} Time: ${hora}${minutos}${segundos}</h6></strong>
            <p><em>${elem.text}</em></p>
        </div>`;
    })
    .join(" ");

  document.getElementById("filaTexto").innerHTML = html;
}
function addMessagechat(e) {
  const mensaje = {
    usuario: document.getElementById("username").value,

    text: document.getElementById("texto").value,
  };

  socket.emit("newChat", mensaje);
  return false;
}
socket.on("chat", (data) => {
  renderChat(data);
});