const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cors = require("cors");
//path = require('path');
const app = express();

//puerto angular
var corsOptions = {origin: "http://localhost:4200"};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//JWT-secret
const JWT_Secret = 'your_secret_key';

//mongodb
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("No se puede conectar a la base de datos.!", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación Tienda Colchon." });
});

//routes
require("./app/routes/producto.routes")(app);
require("./app/routes/usuario.routes")(app);

// Establece el puerto y se queda escuchando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});






/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/


