const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const promocionesSchema = new Schema({
  categoria: String,
  producto: String,
  mensaje: Array,
  imagePath: String,
  banco: String
});

const Promociones = mongoose.model('Promociones', promocionesSchema);

module.exports = Promociones;