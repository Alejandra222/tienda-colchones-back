module.exports = app => {
    
      const productos = require("../controllers/producto.controller.js");
    
      var router = require("express").Router();
    
      // Crea un Producto
      router.post("/", productos.create);
    
      // Filtra por Tipo de Productos
      router.get("/:limite/:posicion", productos.findAll);
    
      // Filtra Productos destacados
      router.get("/destacado/:limite/:posicion", productos.findAllDestacados);

      // Obtiene un producto por id
      router.get("/:id", productos.findOne);
    
      // Actualiza un producto
      router.put("/:id", productos.update);
    
      // Elimina un producto
      router.delete("/:id", productos.delete);

      app.use('/api/productos', router);
    };