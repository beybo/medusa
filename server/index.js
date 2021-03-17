const config = require("../app-config");

// Para el servidor de express
const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const helmet = require('helmet');

app.use(helmet());
// Controladores
const apiCriptoDivisas = require('./controlador/api-criptodivisas');

// Funcionamiento de la comunicación por socket
const funcionesSocket = require('./socket')(http);

apiCriptoDivisas.init(funcionesSocket).catch(err => {
    console.log(err);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/login',require('./rutas/login'));

http.listen(config.servidor.puerto,()=>{
    console.log("Escuchando en: "+config.servidor.puerto)
});