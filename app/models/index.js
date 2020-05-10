const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.productos = require("./producto.model.js")(mongoose);
db.usuarios = require("./usuario.model.js")(mongoose);
module.exports = db;
