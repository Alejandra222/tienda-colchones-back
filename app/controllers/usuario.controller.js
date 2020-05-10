const db = require("../models");
const Usuario = db.usuarios;
//const jwt = require('jsonwebtoken');
//JWT-secret
//const JWT_Secret = 'your_secret_key';

exports.create = (req, res) => {
    
  // Creamos el usuarios
  const usuario = new Usuario({
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol ? req.body.rol : 'Usuario'
  });
  
  // Guardamos el usuario en BD
  usuario
    .save(usuario)
    .then(data => {
      res.send({usuarios: data, message: "El usuario se guardo correctamente.!"});
    })
    .catch(err => {
      res.status(500).send({
        message:"Se produjo algún error al crear el usuario.", errorBD: err.message});
    });
};

//Todos los usuarios
exports.findAll = (req, res) => {
   
    Usuario.find()
      .then(data => {
        res.send({usuarios:data, totalUsuarios:data.length});
      })
      .catch(err => {
        res.status(500).send({
          message:"Se produjo algún error en la busqueda de usuarios.", errorBD: err.message
        });
      });
  };


  exports.findAuthenticate = (req, res) => {
    const email = req.params.email;
    console.log(req.params.email)
    Usuario.find({ email: req.params.email})
      .then(data => {
        if (data.length==0){
          res.status(404).send({ message: "El email no es correcto " + email });
        }
      })
      Usuario.find({ email: req.params.email, password: req.params.password})
      .then(data => {
         // var token = jwt.sign(data, JWT_Secret);
        if (data.length == 0)
          res.status(404).send({ message: "La contraseña no es correcta." });
        else res.send({usuario:data, token:'12345'});
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error en el login" });
      });
  };

