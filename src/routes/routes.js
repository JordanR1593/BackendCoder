

function getRoot(req,res){
    res.render('main')
}

function getLogin(req,res){
    if(req.isAuthenticated()){
        res.redirect('profile')
    }else{
        res.render('login')
    }
}

function postLogin(req,res){
    if(req.isAuthenticated()){
        res.redirect('profile')
    }else{
        res.redirect('login')
    }
}

function getSignup(req,res){
    res.render('signup')
}

function postSignup (req,res){
    if(req.isAuthenticated()){
        res.redirect('profile')
    }else{
        res.redirect('login')
    }
}

function getProfile (req,res){
    if (req.isAuthenticated()){
        let user = req.user;
        res.render('profileUser',{user:user, isUser:true})
    }else{
        res.redirect('login')
    }
}

function getFaillogin(req,res){
    res.render('login-error',{})
}

function getFailsignup(req,res){
    res.render('signup-error',{})
}

function getLogout(req,res){
    req.logout((err)=>{
        if(!err){
            res.render('main')

        }
    })
}

function failRoute(req,res){
    res.status(404).render('routing-eror',{})
}

function checkAuthentication(req,res,next){
    if (req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports={
    getRoot,
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getProfile,
    getFaillogin,
    getFailsignup,
    getLogout,
    failRoute,
    checkAuthentication
}