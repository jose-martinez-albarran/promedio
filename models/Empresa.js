const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const empresaSchema = new Schema({
  nombreEmpresa: String,
  direccionEmpresa: String,
  rfcEmpresa: String,
  telefonoEmpresa: String,
  correoEmpresa: String,
  giroEmpresa: String,
  empleadosEmpresa: [{type: Schema.ObjectId, ref: 'User'}]
}, {
  timestamps: { 
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Empresa = mongoose.model("Empresa", empresaSchema);

module.exports = Empresa;