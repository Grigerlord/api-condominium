import moment from "moment-timezone";
import rolesModels from '../models/userRoles';

const today = moment().tz("America/Caracas").format("YYYY-MM-DD");

class RolesControllers {
  // ======================CREATE ROLE==================================
  async createRole(req, res) {
    try {
      const { name, description } = req.body;

      const existRole = await rolesModels.findOne({ name });

      if (!name) return res.status(400).json({ error: "Input a role name!" });
      if (existRole) return res.status(400).json({ error: "This role do not exists in database!" });

      const role = await rolesModels.create({
        name,
        description,
      });

      return res.status(201).json({
        message: "Role created!",
        data: role,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  /**
    ======================GET ALL ROLES SOFT====================================
  */
  async getRolesSoft(req, res) {
    try {
      const roles = await rolesModels.find({ deletedAt: null });

      return res.status(200).json({
        message: "Success",
        roles,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ======================GET ALL ROLES HARD====================================

  async getRoles(req, res) {
    try {
      const roles = await rolesModels.find();

      return res.status(200).json({
        msg: "Success",
        roles,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ======================GET ROLE BY ID===============================

  async getRole(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        error: 'Id is required into the params!',
      });
    }

    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const role = await rolesModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!role || role.deletedAt !== null) return res.status(404).json({ error: "Id role don't exist!" });

      return res.status(200).json({
        message: "Success!",
        role,
      });
    } catch (error) {
      if (error.name === "CastError") return res.status(400).json({ error: "Id malformed!" });
      return res.status(422).json({ error });
    }
  }

  // ======================GET ROLE BY ID HARD===============================

  async getRoleHard(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        error: 'Id is required into the params!',
      });
    }

    try {
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const role = await rolesModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!role) return res.status(404).json({ error: "Id role don't exist!" });

      return res.status(200).json({
        message: "Success!",
        role,
      });
    } catch (error) {
      if (error.name === "CastError") return res.status(400).json({ error: "Id malformed!" });
      return res.status(422).json({ error });
    }
  }

  // ======================SOFT DELETE ROLE BY ID============================
  async softDeleteRole(req, res) {
    const { _id } = req.params;
    try {
      if (!_id) {
        return res.status(422).json({
          error: 'Id require into the params!',
        });
      }

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const role = await rolesModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!role || role.deletedAt !== null) return res.status(404).json({ error: "Id role don't exist!" });

      // edita el campo deletedAt. Ya no sera devuelto en busquedas soft
      await rolesModels.findByIdAndUpdate(
        _id,
        { deletedAt: new Date() },
        { new: true },
      );

      // Busca el role con atributo deletedAt !== null
      const roleDeleted = await rolesModels.findOne({ _id });

      // si encuentra el role, responde OK
      return res.status(200).json({
        message: "Record send to the paper bin!",
        roleDeleted,
      });
    } catch (error) {
      if (error.name === "CastError") return res.status(400).json({ error: "Id malformed!" });
      return res.status(500).json(error);
    }
  }

  // ======================HARD DELETE ROLE BY ID============================
  async deleteRole(req, res) {
    const { _id } = req.params;
    try {
      if (!_id) {
        return res.status(422).json({
          error: 'Id is require into the params!',
        });
      }
      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

      // Busca en la BDD un rol con el mismo id. Devuelve null si no existe
      const role = await rolesModels.findOne({ _id });

      // comprueba que exista el role en la DBB
      if (!role) return res.status(404).json({ error: "Id role don't exist!" });

      await role.delete();

      return res.status(200).json({
        message: "Record deleted!",
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ======================UPDATE ROLE BY ID============================
  async updateRole(req, res) {
    // Recibe el id, que debe estar al final de la ruta update
    const { _id } = req.params;

    // Verifica que el parametro haya sido enviado (No hace nada)
    if (!_id) {
      return res.status(422).json({
        error: 'Id is require into params!',
      });
    }

    // Se confirma que el id tiene un formato valido de 24 caracteres
    if (_id.length !== 24) return res.status(400).json({ error: "Id malformed!" });

    try {
      // Busca el role con el id enviado
      const oldRole = await rolesModels.findOne({ _id });

      // Verifica que el rol con el id especificado exista en la database
      if (!oldRole) {
        return res.status(404).json({
          error: "Role is not found in database!",
        });
      }

      const role = req.body;
      role.updatedAt = today;
      await rolesModels.findOneAndUpdate({ _id }, role);
      const newRole = await rolesModels.findOne({ _id });

      return res.status(200).json({
        message: "Success! Role update!",
        oldRole_DELETED: oldRole,
        newRole,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new RolesControllers();