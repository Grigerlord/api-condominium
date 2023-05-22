import localServices from "../services/locals.services";

class LocalsController {
  // ================CREATE LOCAL=======================
  async createLocal(req, res) {
    try {
      const {
        condominium,
        building,
        number,
        ubication,
        owner,
        dimentions,
        use,
      } = req.body;

      // Verificacion de datos
      if (!condominium || !building || !number || !ubication || !owner || !dimentions || !use) {
        return res.status(400).json({
          isCreated: false,
          message: "Debe ingresar todos los datos necesarios para crear un local. Condominio y Edificio al que pertenece, numero, ubicacion, dueño, dimenciones y su uso!",
        });
      }

      const newLocal = req.body;
      const localStored = await localServices.createLocal(newLocal);
      return res.status(201).json({
        isCreated: true,
        data: localStored,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================GET LOCALS========================
  async getAll(req, res) {
    try {
      const allLocals = await localServices.getAll();
      return res.status(200).json({
        data: allLocals,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================GET LOCAL=========================
  async getOne(req, res) {
    try {
      const _id = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const local = await localServices.getOne(_id);

      // comprueba que exista la licencia en la DBB
      if (local === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

      return res.status(200).json({
        data: local,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================DELETE LOCAL======================
  async delete(req, res) {
    try {
      const _id = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const local = await localServices.getOne(_id);

      // comprueba que exista la licencia en la DBB
      if (local === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

      await localServices.delete(_id);
      return res.status(200).json({
        isDeleted: true,
        data: local,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================UPDATE LOCAL======================
  async update(req, res) {
    try {
      const _id = req.params;
      const oldLocal = await localServices.getOne(_id);
      if (!oldLocal) {
        return res.status(404).json({
          message: "The local is not found",
        });
      }
      const updatedLocal = {
        ...oldLocal._doc,
        ...req.body,
      };
      await localServices.update(_id, updatedLocal);
      return res.status(200).json({
        isUpdated: true,
        data: updatedLocal,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new LocalsController();