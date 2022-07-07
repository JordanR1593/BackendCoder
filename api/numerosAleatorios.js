const {fork}=require('child_process')
const forked=fork('./aleatorio')
forked.send('start')
let aleatorio=null
forked.on('message',aleatorio=>{
    return aleatorio= aleatorio
})
function createdObject(aleatorio){
    let ObjectRandom=[]
    aleatorio.forEach(
        elem=>{
            let i=0
            if(elem==ObjectRandom[i]){
                ObjectRandom.push(elem)
            }else{
                return false
            }
        }
    )
    
    
   
}
module.exports={createdObject}