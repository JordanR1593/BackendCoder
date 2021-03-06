const {validatePass} = require('./src/utils/passValidator');
const {createHash} = require('./src/utils/hashGenerator')
const express = require('express');
const session = require('express-session');
const winston = require('winston');
const compression= require('compression')

const modelousuario = require('./src/models/usuarios')
const {TIEMPO_EXPIRACION}= require('./src/config/globals');

const handlebars = require('express-handlebars');
const routes = require('./src/routes/routes');
const passport = require('passport');

const passport = require('passport');
const { application } = require('express');
const { log } = require('console');
const LocalStrategy = require('passport-local').Strategy

const createdObject=require('./api/numerosAleatorios')

const app= express()
app.use(compression())
app.use(session({
    secret: 'coder',
    cookie:{
        httpOnly:false,
        secure:false,
        maxAge:parseInt(TIEMPO_EXPIRACION)
    },
    rolling:true,
    resave:true,
    saveUninitialized:true



}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir:__dirname + '/src/views/layouts',
        partialsDir:__dirname+'/src/views/partials/',
        runtimeOptions:{
            allowedProtoPropertiesByDefault:true,
            allowProtoMethodsByDefault:true,
        }
    })
)

app.set('view engine','hbs');
app.set('views','/src/views');
app.use(express.static(__dirname+'/public'))

passport.use('login',new LocalStrategy(
    (username,password,callback)=>{
        modelousuario.findOne({username:username},(err,user)=>{
            if(err){
                return callback(err)
            }
            if(!user){
                console.log('No se encontro el usuario')
                return callback(null, false)
            }

            if(!validatePass(user, password)){
                console.log('Invalid Password')
                return callback(null, false)
            }
            return callback(null,user)
        })
    }
))


passport.use('signup',new LocalStrategy({passReqToCallback:true},
    (req,username,password,callback)=>{
        modelousuario.findOne({username:username},(err,user)=>{
            if(err){
                return callback(err)
            }
            if(user){
                console.log('El usuario ya existe')
                return callback(null, false)
            }

            const newUser={
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                username:username,
                password:createHash(password)
            }

            modelousuario.create(newUser,(err,userWithId)=>{
                if(err){
                    console.log('hay un error')
                }
                console.log('Creacion de usuario ok')
            })
            return callback(null,user)
        })
    }
))

passport.serializeUser((user,callbacj)=>{
    callback(null,user._id)
})

passport.deserializeUser((user,callbacj)=>{
    modelousuario.findById(id,callback)
})

app.get('/',routes.getRoot);

app.get('/login', routes.getLogin)
app.post('/login', passport.authenticate('login',{failureRedirect:'/faillogin'}),routes.postLogin);
app.get('faillogin', routes.getFaillogin)


app.get('/signup', routes.getSignup)
app.post('/signup', passport.authenticate('signup',{failureRedirect:'/failsignup'}),routes.postSignup);
app.get('failsignup', routes.getFailsignup)

app.get('/logout',routes.getLogout)

app.get('/profile', routes.getProfile)

app.get('/ruta-protegida', routes.checkAuthentication,(req,res)=>{
    res.render('protected')
})
app.get('/winstonInfo', (req, res) => {
    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            new winston.transports.Console( { level: 'info' }),
            
        ]
    })

  
    logger.log('info', 'Log info');
    logger.log('warn', 'Log warn');
    logger.log('error', 'Log error');

    //logger.info('Log info')

    

    res.send({response: 'hola coders info'});
})

app.get('/winstonWarning', (req, res) => {
    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            
            new winston.transports.File( { filename: 'warn.log',  level: 'warning' }),
        ]
    })

    
    logger.log('warn', 'Log warn');
    logger.log('error', 'Log error');

    //logger.info('Log info')

    

    res.send({response: 'hola coders warn'});
})

app.get('/winstonError', (req, res) => {
    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            
            new winston.transports.File( { filename: 'error.log',  level: 'error' }),
        ]
    })

    
   
    logger.log('error', 'Log error error');

    //logger.info('Log info')

    

    res.send({response: 'hola coders'});
})

app.get('/info/?modo',(req,res)=>{
    if(req.params.modo=='compression'){
        app.use(compression())
        res.send({
            plataforma:process.platform,
            versionNode:process.version,
            memoria:process.memoryUsage(),
            directorio:process.cwd(),
            pid:process.pid
    
        })
    }else{
        res.send({
            plataforma:process.platform,
            versionNode:process.version,
            memoria:process.memoryUsage(),
            directorio:process.cwd(),
            pid:process.pid
    
        })
    }
    
})

app.get('./api/randoms/?id',(req,res)=>{
    
    res.send(createdObject(req.params.id))
})
app.get('*',routes.failRoute)

const server= app.listen(8080,()=>{
    console.log('conectado srvidor')
})

server.on('error',error=> console.log(`Error en el servidor ${error}`))
