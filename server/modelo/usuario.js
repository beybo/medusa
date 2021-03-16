const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema ({
    id_google:{ type: String, required: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },

    cartera:[
        {
            id_divisa:String,
            cantidad:Number
        }
    ],

    transacciones:[
        {
            id_divisa:String,
            cantidad:String,
            fecha:Number,
            precio_compra:Number
        }
    ]

});

module.exports = mongoose.model('Usuario', Usuario)