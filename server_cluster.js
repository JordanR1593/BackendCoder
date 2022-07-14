const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const PORT = 8080;


//       |--------

if(cluster.isMaster) { // isPrimary
    console.log(`PID Master ${process.pid}`);

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork()
    }


    

    cluster.on('exit', worker => {
        console.log(`PID Worker ${worker.process.pid} died`);
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(cluster.process.id);
    }).listen(PORT)

    console.log('Servidor esta escuchando en el puerto 8080');
}