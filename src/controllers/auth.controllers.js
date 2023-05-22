// import moment from "moment-timezone";
// import jwt from 'jsonwebtoken';
import usersModels from "../models/users";
import generateRefreshToken from "../utils/generateRefreshToken";
import generateToken from "../utils/generateToken";
import tokenVerificationErrors from "../utils/tokenVerificationErrors";
import logHistoryControllers from "./logHistory.controllers";

// const today = moment().tz("America/Caracas").format("YYYY-MM-DD");

class AuthControllers {
  /**
    ==============================LOGIN================================
  */
  async logIn(req, res) {
    try {
      // se guardan los datos enviados del front
      const { email, password } = req.body;

      // se busca el user en la BDD segun el email y si no existe devuelve 403
      const user = await usersModels.findOne({ email });
      if (!user) return res.status(403).json({ error: "Incorrect data - u" });

      // si el usuario fue borrado de la base de datos de forma SOFT DELETE, envia un error
      if (user.deletedAt !== null) return res.status(404).json({ error: "User not found!" });

      // Se compara la PASS recibida con la guardada en la BDD
      const responsePassword = await user.comparePassword(password);
      if (!responsePassword) return res.status(403).json({ error: "incorrect data - p" });

      // Genera y guarda un JWT
      const { accessToken, expiresIn } = generateToken(user._id);

      generateRefreshToken(user._id, res);

      const { _id, roleName, roleId } = user;

      logHistoryControllers.createRecord({
        userId: user._id,
        domain: null,
        typeOperation: "logIn",
        request: null,
      });

      return res.status(200).json({
        msg: "Login access true",
        auth: true,
        accessToken,
        expiresIn,
        user_id: _id,
        roleName,
        roleId,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ======================REFRESH TOKEN======================================
  async refreshToken(req, res) {
    try {
      // Se crea un nuevo token.
      const { accessToken, expiresIn } = generateToken(req.uid);

      // se envia el nuevo token al cliente
      res.json({ accessToken, expiresIn });
    } catch (error) {
      return res
        .status(401)
        .send({ error: tokenVerificationErrors[error.message] });
    }
    return null;
  }

  /**
    =============================LOGOUT================================
  */
  async logout(req, res) {
    res.clearCookie("refreshToken");
    res.json({ logout: true });
  }

  /**
    =============================infoUser================================
  */
  async infoUser(req, res) {
    try {
      const user = await usersModels.findById(req.uid).lean();
      console.log(req.uid);

      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: "Error server infoUser" });
    }
  }
}

export default new AuthControllers();
