const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const beneficiariosSchema = new Schema({
  nombreBeneficiario: String,
  apellidoPaternoBeneficiario: String,
  apellidoMaternoBeneficiario: String,
  parentesco: String,
  porcentaje: Number,
  asegurado: [{type: Schema.ObjectId, ref: 'User'}]
}, {
  timestamps: { 
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Beneficiarios = mongoose.model("Beneficiarios", beneficiariosSchema);

module.exports = Beneficiarios;