var Router       = require('router')
const router = Router();
router.get('/', function (req, res) {
    console.log("hola")
    
   res.render("main");    
})


  module.exports = router