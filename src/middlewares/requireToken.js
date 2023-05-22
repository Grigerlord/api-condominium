import jwt from "jsonwebtoken";
import tokenVerificationErrors from "../utils/tokenVerificationErrors";

const requireToken = (req, res, next) => {
  try {
    // recibe un token en formato bearer desde la peticion del cliente.
    const bearerToken = req.headers?.authorization;

    // Creamos este error si no existe el Bearer
    if (!bearerToken) throw new Error("No Bearer");

    // El token es igual al Bearer, sin el string 'Bearer ' al inicio. (se borra esa parte del string)
    const token = bearerToken.split(" ")[1];

    // El token contiene el id del usuario. Lo sustraemos al verificarlo
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    // agregamos a la respuesta una propiedad uid
    req.uid = uid;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: tokenVerificationErrors[error.message] });
  }

  return null;
};

export default requireToken;