const config = require("../../app-config");

const express = require('express');
const router = express.Router();
const cors = require('cors');

// Generación de tokens
const jwt = require('jsonwebtoken');

// Controladores
const controladorGoogle = require('../controlador/api-google.js');
const controladorUsuario = require('../controlador/usuario');

let valoresCors = {origin:"http://localhost:8080",optionsSuccessStatus: 200};

router.options('/google',cors(valoresCors));

router.post('/google',cors(valoresCors),async (req,res)=>{

    //todo verificar que el body contiene todo y es válido
    if(req.body.google.uc.id_token){

        let payload;
        let existe;

        try{
            payload = await controladorGoogle.verificarToken(req.body.google.uc.id_token);

            existe = await controladorUsuario.existeUsuarioDeGoogle(payload.sub);
        }catch (err){
            console.log(err);
            res.send({
                error:true,
                mensaje:"Error con la autenticación"
            });
            return;
        }

        let token = firmarToken({
            email: payload.email,
            id:payload.sub,
            registrado:existe
        });

        res.send({
            error:false,
            token: token,
            registrado:existe
        });

    }

});

router.options('/registro',cors(valoresCors));
router.post('/registro',cors(valoresCors),async (req,res)=> {

    let body = req.body;

    if(body.nombre && body.token){

        let token = jwt.decode(body.token);

        console.log(token);

        res.send({
            error:false
        })

    }

    console.log(req.body);

});

function firmarToken(datos){
    jwt.sign(datos,
        config.servidor.secreto_app,
        {
            algorithm:"HS512",
            expiresIn: "365d"
        }
    );
}

module.exports = router;