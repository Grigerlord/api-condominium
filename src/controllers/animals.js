import moment from "moment-timezone";
import Animals from "../models/animals";

const today = moment().tz("America/Caracas").format("YYYY-MM-DD");

class AnimalsControllers {
  async create(req, res) {
    const { animal } = req.body;
    if (!animal) {
      return res.status(422).json({
        msg: "Animal is not found",
        errors: [],
      });
    }

    const errors = this.validate(animal);

    if (errors.length > 0) {
      return res.status(422).json({
        msg: "Error in the params",
        errors,
      });
    }

    animal.createdAt = today;
    const newAnimal = await Animals.create(animal);

    return res.status(200).json({
      msg: "Success",
      animal: newAnimal,
    });
  }

  async getList(req, res) {
    const animals = await Animals.find();

    return res.status(200).json({
      msg: "Success",
      animals,
    });
  }

  async getDetail(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        msg: 'Es necesario "_id" para conocer registro a mostrar',
      });
    }
    const animal = await Animals.findOne({ _id });
    if (!animal) {
      return res.status(404).json({
        msg: "No fue encontrado el animal",
        animal: null,
      });
    }

    return res.status(200).json({
      msg: "Success",
      animal,
    });
  }

  async delete(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        msg: 'Es necesario "_id" para conocer registro a mostrar',
      });
    }
    const animal = await Animals.findOne({ _id });
    if (!animal) {
      return res.status(404).json({
        msg: "No fue encontrado el animal",
        animal: null,
      });
    }

    animal.delete();

    return res.status(200).json({
      msg: "Registro eliminado yayayayayaya",
    });
  }

  async update(req, res) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(422).json({
        msg: 'Es necesario "_id" para conocer registro a actualizar',
      });
    }

    const { animal } = req.body;
    if (!animal) {
      return res.status(422).json({
        msg: "Animal is not found",
        errors: [],
      });
    }

    const errors = this.validate(animal);

    if (errors.length > 0) {
      return res.status(422).json({
        msg: "Error in the params",
        errors,
      });
    }

    const a = await Animals.findOne({ _id });
    if (!a) {
      return res.status(404).json({
        msg: "No fue encontrado el animal",
        animal: null,
      });
    }

    animal.updatedAt = today;
    await Animals.findOneAndUpdate({ _id }, animal);

    return res.status(200).json({
      msg: "Success",
      animal,
    });
  }

  validate(animal) {
    const errors = [];
    const {
      name, family, description, age,
    } = animal;

    if (name) {
      if (typeof name !== "string") {
        errors.push({
          msg: "Field name is not a string",
          field: "name",
        });
      } else if (name.length < 0) {
        errors.push({
          msg: "Field name is empty",
          field: "name",
        });
      }
    }
    if (family) {
      if (typeof family !== "string") {
        errors.push({
          msg: "Field family is not a string",
          field: "family",
        });
      } else if (family.length < 0) {
        errors.push({
          msg: "Field family is empty",
          field: "family",
        });
      }
    }
    if (description) {
      if (typeof description !== "string") {
        errors.push({
          msg: "Field description is not a string",
          field: "description",
        });
      } else if (description.length < 0) {
        errors.push({
          msg: "Field description is empty",
          field: "description",
        });
      }
    }
    if (age) {
      if (typeof age !== "number") {
        errors.push({
          msg: "Field age is not a number",
          field: "age",
        });
      }
    }

    return errors;
  }
}

module.exports = new AnimalsControllers();
