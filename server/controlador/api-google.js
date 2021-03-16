const config = require("../../app-config");

// Para el uso de la api de google
const {OAuth2Client} = require('google-auth-library');
let clienteAuth2 = new OAuth2Client(config.servidor.auth_id);

module.exports = {
    async verificarToken(token){

        let ticket = await clienteAuth2.verifyIdToken({
            idToken: token,
            audience: config.servidor.auth_id
        })

        return ticket.getPayload();

    }
}