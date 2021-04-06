const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //leer el token del header
  const token = req.header("x-auth-token");

  // console.log(token);

  //revisar si no hay token
  if (!token) {
    return res.status(401).json({ msn: "No tienes permisos" });
  }

  //validar el token

  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msn: "Token no válido" });
  }
};
