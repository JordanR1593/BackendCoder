process.on('message',   msg=>{
    const aleatorio=(n=100000000)=>{
        const aleatorio=[]
        for (let index = 0; index < n; index++) {
            
            aleatorio.push(Math.floor((Math.random() * (1000 - 1 + 1)) + 1))
        }
        process.send (Math.floor((Math.random() * (1000 - 1 + 1)) + 1)*n);
    }

})






