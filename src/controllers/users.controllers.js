import moment from "moment-timezone";
import usersModels from '../models/users';
import generateRefreshToken from "../utils/generateRefreshToken";
import generateToken from "../utils/generateToken";
import logHistoryControllers from "./logHistory.controllers";
import roleModels from '../models/userRoles';

const today = moment().tz("America/Caracas").format("YYYY-MM-DD");

class UsersControllers {
  //  ======================CREATE USER==================================
  async createUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        identDocument,
        phoneNumber,
        address,
        roleName,
        licenses,
        company,
      } = req.body;
      const user = req.body;

      // Se asiga un ID de un roleModel, segun el tipo de role (string) del User
      if (roleName === '') {
        const userRoleId = await roleModels.findOne({ name: 'administrator' });
        user.roleId = userRoleId._id;
      } else {
        const userRoleId = await roleModels.findOne({ name: roleName });
        user.roleId = userRoleId._id;
      }

      // crea el usuario
      const newUser = await usersModels.create(
        user,
      );

      // guarda el usuario
      await newUser.save();

      const newUserId = await usersModels.findOne({ email });

      // Guarda en el logHistory un registro de la creacion del nuevo User
      const record = await logHistoryControllers.createRecord({
        userId: newUserId._id,
        domain: '',
        typeOperation: 'creationUser',
        request: user,
      });

      // Genera y guarda un JWT y un RJWT
      const { accessToken, expiresIn } = generateToken(newUserId._id);
      generateRefreshToken(newUserId._id, res);

      // Respuesta
      return res.status(201).json({
        message: 'User created!',
        accessToken,
        expiresIn,
        _id: newUserId._id,
        firstName,
        lastName,
        userName,
        email,
        roleName,
        licenses,
        identDocument,
        phoneNumber,
        address,
        company,
        roleId: user.roleId,
        record: record.msg,
      });
    } catch (errors) {
      if (errors.message === "Cannot read properties of null (reading '_id')") {
        return res.status(404).json({
          error: `No exieten usuarios del tipo: '${req.body.roleName}'.`,
        });
      }
      if (errors.code === 11000) {
        res.status(404).json({
          error: `
            Un usuario ya ha sido registrado con estos datos!
            Intente cambiando los siguientes datos:
            -Nombre de usuario
            -Email
            -Documento de identidad
            -Numero telefonico`,
          errors,
        });
      } else {
        res.status(422).json({ error: errors.message, errors });
      }
    }

    return null;
  }

  // ======================GET USERS====================================
  async getUsers(req, res) {
    try {
      const users = await usersModels.find({ deletedAt: null });
      return res.status(200).json({
        message: "Success",
        users,
      });
    } catch (error) {
      return res.status5(500).json({ error });
    }
  }

  // ======================GET USERS HARD====================================
  async getUsersHard(req, res) {
    try {
      const users = await usersModels.find();

      return res.status(200).json({
        message: "Success",
        users,
      });
    } catch (error) {
      return res.status5(500).json({ error });
    }
  }

  // ======================GET USER BY ID===============================
  async getUser(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        msg: 'Id require into params!',
      });
    }
    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const user = await usersModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!user || user.deletedAt !== null) return res.status(404).json({ error: "Id user don't exist!" });

      return res.status(200).json({
        message: "Success",
        user,
      });
    } catch (error) {
      if (error.name === 'CastError') return res.status(400).json({ error: 'ID malformed!' });
      return res.status(500).json({ error });
    }
  }

  // ======================GET USER HARD BY ID===============================
  async getUserHard(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        error: 'Id require into params!',
      });
    }
    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const user = await usersModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!user) return res.status(404).json({ error: "Id user don't exist!" });

      return res.status(200).json({
        message: "Success",
        user,
      });
    } catch (error) {
      if (error.name === 'CastError') return res.status(400).json({ error: 'ID malformed!' });
      return res.status(500).json({ error });
    }
  }

  //  ======================SOFT DELETE USER============================

  async deleteUser(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        error: 'Id require into params!',
      });
    }

    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const user = await usersModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!user) return res.status(404).json({ error: "Id user don't exist!" });

      // edita el campo deletedAt. Ya no sera devuelto en busquedas soft
      await usersModels.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() },
        { new: true },
      );

      return res.status(200).json({
        message: "Record deleted!",
        user,
      });
    } catch (error) {
      if (error.name === 'CastError') return res.status(400).json({ error: 'ID malformed!' });
      return res.status(422).json({ error });
    }
  }

  //  ======================DELETE HARD USER============================
  async deleteUserHard(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        error: 'Id is required into paramas!',
      });
    }
    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const user = await usersModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!user) return res.status(404).json({ error: "Id user don't exist!" });

      await user.delete();

      return res.status(200).json({
        message: "Record deleted!",
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
    ======================UPDATE USER BY ID============================
  */
  async updateUser(req, res) {
    try {
      // Recibe el id, que debe estar al final de la ruta update
      const { _id } = req.params;
      if (!_id) {
        return res.status(422).json({
          error: 'ID is required ito params!',
        });
      }

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca el role con el id enviado
      const oldUser = await usersModels.findOne({
        _id,
        deletedAt: null,
      });

      // Verifica que el rol con el id especificado exista en la database
      if (!oldUser) return res.status(404).json({ error: "User not exist in the data base!" });

      const user = req.body;
      user.updatedAt = today;
      await usersModels.findOneAndUpdate({ _id }, user);
      const newUser = await usersModels.findOne({ _id });

      return res.status(200).json({
        message: "Success! User update!",
        // oldUser_DELETED: oldUser,
        newUser,
      });
    } catch (error) {
      if (error.codeName === "DuplicateKey") res.status(404).json({ error: 'Duplicate key!' });
    }
    return null;
  }
}

export default new UsersControllers();