//rutas para autentificar usuarios

//importar express
const express = require("express");
//importar el routing de express
const router = express.Router();
//
const { check } = require("express-validator");
//importar controller
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
//api/auth
router.post(
  "/",

  //antes de enviar el usuario
  authController.autenticarUsuario
);
//-------------------------

//obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
