require("../db");
const Usuario = require("../modelo/usuario");

module.exports = {

    async nuevo(datos){

        datos.cartera = [{
            id_divisa:"eur",
            cantidad: 10000
        }];

        let nuevoUsuario = new Usuario(datos);

        await nuevoUsuario.save();

        console.log("Usuario Guardado")

    },

    async getUsuario(idGoogle){
        return Usuario.find({id_google: idGoogle});
    },

    // Funciones para comprobar
    async existeNombre(nombre){

        let resultado = await Usuario.find({nombre:nombre});

        return resultado.length > 0;

    },

    async existeUsuarioDeGoogle(idGoogle){

        let resultado = await Usuario.find({id_google:idGoogle});

        return resultado.length > 0;

    }

};