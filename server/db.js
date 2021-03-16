const mongoose = require('mongoose');
const configDb = require("../app-config").servidor.db;

mongoose.connect(`mongodb://${configDb.usuario}:${configDb.clave}@${configDb.host}:${configDb.puerto}/${configDb.nombre}?authSource=admin`, {useNewUrlParser: true,useUnifiedTopology:true});