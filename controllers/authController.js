//controller con metodos hacia los endpoints (middlewares)

//importar modelo
const Usuario = require("../models/Usuario");
//importar el hasher de password
const bcriyptjs = require("bcryptjs");
//importar validation result
const { validationResult } = require("express-validator");
//importar json web token
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraemso el email y el password
  const { email, password } = req.body;

  try {
    //revisamos que el usuario exista
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //revisar el password
    const passCorrecto = await bcriyptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "El password es incorrecto" });
    }

    //si todo es correcto crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene el usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
