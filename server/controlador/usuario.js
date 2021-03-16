require("../db");
const Usuario = require("../modelo/usuario");


module.exports = {

    async nuevo(datos){
        let nuevoUsuario = new Usuario(datos);

        await nuevoUsuario.save();

        console.log("Usuario Guardado")

    },

    async existeNombreDeUsuario(nombre){

        let resultado = await Usuario.find({nombre:nombre});

        return resultado.length > 0;

    },

    async existeUsuarioDeGoogle(idGoogle){

        let resultado = await Usuario.find({id_google:idGoogle});

        return resultado.length > 0;

    }

};