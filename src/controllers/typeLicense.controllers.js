import licensesService from "../services/typeLicense";

class LicensesController {
  // ====================================POST LICENSE=====================================
  async store(req, res) {
    try {
      const {
        name,
        price,
        description,
        duration,
        modules,
      } = req.body;

      if (!name || !price || !description || !duration || !modules) {
        return res.status(400).json({
          isStored: false,
          message: "More items are required",
        });
      }

      const newLicense = req.body;
      const licenseStored = await licensesService.store(newLicense);
      return res.status(200).json({
        isStored: true,
        data: licenseStored,
      });
    } catch (error) {
      if (error.code === 11000) return res.status(400).json({ error: "Ya existe una licencia con este nombre!" });
      return res.status(500).json({ error });
    }
  }

  // ==================================GET ALL LICENSES===================================
  async getAll(req, res) {
    const allLicenses = await licensesService.getAll();
    return res.status(200).json({
      total: allLicenses.length,
      data: allLicenses,
    });
  }

  // ==================================HARD GET ALL LICENSES===================================
  async getAllHard(req, res) {
    const allLicenses = await licensesService.getAllHard();
    return res.status(200).json({
      total: allLicenses.length,
      data: allLicenses,
    });
  }

  // ===================================GET LICENSE BY ID=================================
  async getOne(req, res) {
    try {
      // Se obtiene el id enviado en la request por parametro
      const { _id } = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const license = await licensesService.getOne(_id);

      // comprueba que exista la licencia en la DBB
      if (license === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

      // si todo es OK, responde
      return res.status(200).json({
        data: license,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ===================================HARD GET LICENSE BY ID=================================
  async getOneHard(req, res) {
    try {
      // Se obtiene el id enviado en la request por parametro
      const { _id } = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const license = await licensesService.getOneHard(_id);

      // comprueba que exista la licencia en la DBB
      if (license === null) return res.status(404).json({ error: "No existe esta licencia con este ID!" });

      // si todo es OK, responde
      return res.status(200).json({
        data: license,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ==================================SOFT DELETE LICENSE================================
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Se confirma que le jwt tiene un formato valido de 24 caracteres
      if (id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const license = await licensesService.getOne(id);

      // comprueba que exista la licencia en la DBB
      if (license === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

      // Verifica que la licencia no este en "papelera"
      if (license.deletedAt !== null) return res.status(404).json({ error: "La licencia no se encuentra en la base de datos!" });

      // Borra la licencia. (No permanentemente)
      await licensesService.delete(id);

      return res.status(200).json({
        deleted: true,
        data_deleted: license,
        message: "🗑 Licencia enviada a la papelera!",
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ==================================HARD DELETE LICENSE================================
  async deleteHard(req, res) {
    try {
      const { id } = req.params;

      // Se confirma que le jwt tiene un formato valido de 24 caracteres
      if (id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const license = await licensesService.getOne(id);

      // comprueba que exista la licencia en la DBB
      if (license === null) return res.status(404).json({ error: "No existe una licencia con este ID!" });

      // Elimina la licencia de forma permanente
      await licensesService.hardDelete(license);

      return res.status(200).json({
        deleted: true,
        data_deleted: license,
        message: "⚠ Los datos que se eliminaron ya no podran recuperase!",
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ======================================UPDATE LICENSE=================================
  async update(req, res) {
    const { id } = req.params;
    const oldLicense = await licensesService.getOne(id);
    if (!oldLicense) {
      return res.status(404).json({
        message: "The licence isn't found",
      });
    }
    const updatedLicense = {
      ...oldLicense._doc,
      ...req.body,
    };
    const response = await licensesService.update(id, updatedLicense);
    return res.status(200).json({
      isUpdated: true,
      data: response,
    });
  }
}

export default new LicensesController();
