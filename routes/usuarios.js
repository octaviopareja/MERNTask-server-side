//rutas para crear usuarios

//importar express
const express = require("express");
//importar el routing de express
const router = express.Router();
//improtar controllers
const usuarioController = require("../controllers/usuarioController");
//
const { check } = require("express-validator");

//Crea un usuario

//api/usuarios -------------
router.post(
  "/",
  //agrego reglas de validacion con un array
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],

  //antes de enviar el usuario

  usuarioController.crearUsuario
);
//-------------------------

module.exports = router;
