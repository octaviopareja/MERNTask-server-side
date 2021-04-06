// traemos express
const mongoose = require("mongoose");

//url a las variables
require("dotenv").config({ path: "variables.env" });

//para conectar a la db
const conectarDB = async () => {
  try {
    //el metodo connect toma dos parametros, el primero es la url y el segundo un objeto de config
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); //si hay un error, detiene la accion
  }
};

//lo hacemos disponible en el servidor
module.exports = conectarDB;
