//controller con metodos hacia los endpoints (middlewares)

//importar modelo
const Usuario = require("../models/Usuario");
//importar el hasher de password
const bcriyptjs = require("bcryptjs");
//importar validation result
const { validationResult } = require("express-validator");
//importar json web token
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisamos si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y el password del body del post
  const { email, password } = req.body;

  try {
    //reviso si existe un usuario con ese email en la bd
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ msg: "El usuario ya existe", categoria: "error" });
    }
    //crear el nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el password
    //con esto se genera el hash unico
    const salt = await bcriyptjs.genSalt(10);
    usuario.password = await bcriyptjs.hash(password, salt);

    //guardar el usuario
    await usuario.save();

    //crear y firmar el jwt
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

    //
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
