//importar mongoose
const mongoose = require("mongoose");

//definir schema de usuarios
const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    //PARA QUE NO SE REPITA EL EMAIL PONEMOS UNIQUE
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("usuario", UsuariosSchema);
