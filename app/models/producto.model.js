module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre: String,
        tipo_producto: String,
        descripcion: String,
        precio: Number,
        imagen: String,
        destacado: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Producto = mongoose.model("producto", schema);
    return Producto;
  };