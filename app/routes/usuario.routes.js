module.exports = app => {
    
    const usuarios = require("../controllers/usuario.controller.js");
 
    var router = require("express").Router();
  
    // Crea un Usuario
    router.post("/", usuarios.create);

    // Obtiene todos los usuarios
    router.get("/", usuarios.findAll);

    // Obtiene un usuario por email y contraseña
    router.get("/authenticate/:email/:password", usuarios.findAuthenticate);
  
    app.use('/api/usuarios', router);
  };