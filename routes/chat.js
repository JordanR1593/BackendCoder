var Router       = require('router')
const routerChat = Router();

routerChat.get("/chat", function (req, res) {
    res.render("chat");
  });
  module.exports = routerChat