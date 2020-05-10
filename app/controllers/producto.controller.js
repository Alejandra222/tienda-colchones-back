const db = require("../models");
const Producto = db.productos;

exports.create = (req, res) => {
  // Validamos los datos de entrada
 /* if (!req.body.nombre) {
    res.status(400).send({ message: "Los campos con asterisco son obligatorio.!" });
    return;
  }*/

  // Creamos el producto
  const producto = new Producto({
    nombre: req.body.nombre,
    tipo_producto: req.body.tipo_producto,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    imagen: req.body.imagen,
    destacado: req.body.destacado ? req.body.destacado : false
  });

  
  // Guardamos el producto en BD
  producto
    .save(producto)
    .then(data => {
      res.send({productos: data, message: "El producto se guardo correctamente.!"});
    })
    .catch(err => {
      res.status(500).send({
        message:"Se produjo algún error al crear el producto.", errorBD: err.message});
    });
};


//Recupere todos los Productos / filtra por tipo_producto(Colchón, Somier)
//GET  localhost:8080/api/productos/2/0?tipo_producto=Colchon   FILTRA
exports.findAll = (req, res) => {
  const tipo_producto = req.query.tipo_producto;
  var condition = tipo_producto ? { tipo_producto: { $regex: new RegExp(tipo_producto), $options: "i" } } : {};
 
  let dataLength;
  const limite = parseInt(req.params.limite);
  const  posicion = parseInt(req.params.posicion);
 
  Producto.find(condition)
    .then(data => {
      dataLength=data.length;
    })
  Producto.find(condition).limit(limite).skip(posicion)
    .then(data => {
      res.send({productos: data, length: dataLength});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo algún error al recuperar los productos."
      });
    });
};

//Recupera un producto por el id:
//GET localhost:8080/api/productos/2
exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No encontrado Tutorial con id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar el tutorial con ID=" + id });
    });
};


//Actualice un Producto identificado por el iden la solicitud:
//PUT localhost:8080/api/productos/2
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Los datos a actualizar no pueden estar vacíos!"
    });
  }

  const id = req.params.id;

  Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar el Producto con ID=${id}. Tal vez no se encontró el tutorial!`
        });
      } else res.send({ message: "El producto se actualizó correctamente!." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar Producto con ID=" + id
      });
    });
};


//Eliminar un producto con el especificado id:
//DELETE  localhost:8080/api/productos/1
exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar el producto con ID=${id}. Tal vez no se encontró el tutorial!`
        });
      } else {
        res.send({
          message: "El producto fue eliminado exitosamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el producto con ID=" + id
      });
    });
};


  //Encuentra todos los productos destacados = true:
  //GET  localhost:8080/api/productos/destacado/5/0 
  exports.findAllDestacados = (req, res) => {
    let dataLength;
    const limite = parseInt(req.params.limite);
    const  posicion = parseInt(req.params.posicion);
  
    Producto.find({ destacado: true })
      .then(data => {
        dataLength=data.length;
      })
    Producto.find({ destacado: true }).limit(limite).skip(posicion)
      .then(data => {
        res.send({productos: data, length: dataLength});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo algún error al recuperar los productos."
        });
      });
  };
