//importar mongoose
const mongoose = require("mongoose");

//definir schema de usuarios
const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "proyecto" },
});

module.exports = mongoose.model("Tarea", TareaSchema);
