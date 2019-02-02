const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose =require('passport-local-mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  empresa: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  sexo: String,
  celular: String,
  correo: String,
  fechaNacimiento: Date,
  rfcEmpleado: String,
  direccion: String,
  puesto: String,
  ingreso: Array,
  beneficiarios: [{type: Schema.ObjectId, ref: 'Beneficiarios'}]
}, {
  timestamps: { 
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

// -> usernameField is an optional config. We could define another field as usernamefield, plm use username field by default.
userSchema.plugin(passportLocalMongoose, {usernameField: "username"});

const User = mongoose.model("User", userSchema);

module.exports = User;