// traemos express
const express = require("express");

// traemos la funcion de conectar a mongo
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

//importar CORS
const cors = require("cors");

//luego de iniciado express, me conecto a la db
conectarDB();

//habilitar CORS
app.use(cors());

//habilitar express.json (para leer los datos que el usuario ingrese en el front)
app.use(express.json({ extented: true }));

//puerto para el servidor
const port = process.env.PORT || 4000;

//importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
