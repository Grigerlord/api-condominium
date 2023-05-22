import condosService from "../services/condos.services";

class CondosController {
  // ================CREATE CONDOMINIUM=======================
  async createCondominium(req, res) {
    const {
      c_id,
      name,
      buildings,
      address,
    } = req.body;

    // Verificacion de datos
    if (!c_id || !name || !buildings || !address) {
      return res.status(400).json({
        isStored: false,
        message: "More items are required",
      });
    }

    const newCondominium = req.body;
    const condominiumStored = await condosService.createCondominium(newCondominium);
    return res.status(200).json({
      isStored: true,
      data: condominiumStored,
    });
  }

  // ================GET CONDOS==============================
  async getAll(req, res) {
    const allCondos = await condosService.getAll();
    return res.status(200).json({
      data: allCondos,
    });
  }

  // ================GET CONDOMINIUM=========================
  async getOne(req, res) {
    const { id } = req.params;
    const condominium = await condosService.getOne(id);
    return res.status(200).json({
      data: condominium,
    });
  }

  // ================DELETE CONDOMINIUM======================
  async delete(req, res) {
    const { id } = req.params;
    const response = await condosService.delete(id);
    return res.status(200).json({
      isDeleted: true,
      data: response,
    });
  }

  // ================UPDATE CONDOMINIUM======================
  async update(req, res) {
    const { id } = req.params;
    const oldCondominium = await condosService.getOne(id);
    if (!oldCondominium) {
      return res.status(404).json({
        message: "The condominium is not found",
      });
    }
    const updatedCondominium = {
      ...oldCondominium._doc,
      ...req.body,
    };
    const response = await condosService.update(id, updatedCondominium);
    return res.status(200).json({
      isUpdated: true,
      data: response,
    });
  }
}

export default new CondosController();