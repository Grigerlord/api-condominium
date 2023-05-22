// import generator from "generate-password";
import licenseFeeBillService from "../services/licenseFeeBill.services";
// import userController from './users.controllers';
// import userModel from "../models/users";

class LicenseFeeBillController {
  // ================CREATE LICENSE_FEE_BILL=======================
  async createLicenseFeeBill(req, res) {
    try {
      // Despues de verificar que los datos de usario son correctos:
      const newLicenseFeeBill = req.body;
      const licenseFeeBillStored = await licenseFeeBillService.createLicenseFeeBill(newLicenseFeeBill);
      await licenseFeeBillStored.save();

      // const clientPassword = generator.generate({
      //   length: 10,
      //   numbers: true,
      // });
      // console.log({ clientPassword });

      // const newUserClient = {
      //   firstName: newLicenseFeeBill.client,
      //   lastName: newLicenseFeeBill.client + 'Lastname',
      //   userName: newLicenseFeeBill.client,
      //   email: newLicenseFeeBill.clientEmail,
      //   password: clientPassword,
      //   identDocument: newLicenseFeeBill.clientIdentDocument,
      //   phoneNumber: "",
      //   address: {},
      //   roleName: "administrator",
      //   licenses: "A license",
      //   company: newLicenseFeeBill.client,
      // };

      // crea el usuario
      // const response = await userModel.createUser({
      //   firstName: newLicenseFeeBill.client,
      //   lastName: `${newLicenseFeeBill.client}Lastname`,
      //   userName: newLicenseFeeBill.client,
      //   email: newLicenseFeeBill.clientEmail,
      //   password: clientPassword,
      //   identDocument: newLicenseFeeBill.clientIdentDocument,
      //   phoneNumber: "",
      //   address: {},
      //   roleName: "administrator",
      //   licenses: "A license free",
      //   company: newLicenseFeeBill.client,
      // });

      // console.log({ response });

      // // guarda el usuario
      // await response.save();

      return res.status(201).json({
        isStored: true,
        data: licenseFeeBillStored,
        // response,
        // user_login_data: newUserClient,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(404).json({
          error: "No fue posible crear el usuario. Alguno de los datos ingresados ya existe en la base de datos. Revise el email y el documento de identidad del cliente.",
        });
      }
      return res.status(500).json({
        error,
      });
    }
  }

  // ================GET ALL LICENSE_FEE_BILL======================
  async getAll(req, res) {
    try {
      const allLicenseFeeBill = await licenseFeeBillService.getAll();
      return res.status(200).json({
        data: allLicenseFeeBill,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================GET LICENSE_FEE_BILL===========================

  async getOne(req, res) {
    try {
      const { _id } = req.params;

      // Se confirma que el id tiene un formato valido de 24 caracteres
      if (_id.length !== 24) return res.status(404).json({ error: "Id malformed!" });

      // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
      const licenseFeeBill = await licenseFeeBillService.getOne(_id);

      // comprueba que exista la licencia en la DBB
      if (licenseFeeBill === null) return res.status(404).json({ error: "license id don't exist!" });

      return res.status(200).json({
        data: licenseFeeBill,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  // ================DELETE LOCAL_INCOME======================
  //   async delete(req, res) {
  //     const { id } = req.params;
  //     const response = await localIncomesService.delete(id);
  //     return res.status(200).json({
  //       status: 200,
  //       isDeleted: true,
  //       data: response,
  //     });
  //   }

  //   // ================UPDATE LICENSE_FEE_BILL==================
  //   async update(req, res) {
  //     try {
  //       console.log(req.params);
  //       const { _id } = req.params;

  //       // Se confirma que el id tiene un formato valido de 24 caracteres
  //       if (_id.length !== 24) return res.status(404).json({ error: "El formato ID es incorrecto!" });

  //       const oldLicenseFeeBill = await licenseFeeBillService.getOne(_id);
  //       if (!oldLicenseFeeBill) {
  //         return res.status(404).json({
  //           message: "License Fee Bill is not found",
  //         });
  //       }

  //       // Busca en la BDD una licencia con el mismo id. Devuelve null si no existe
  //       const licenseFeeBill = await licenseFeeBillService.getOne(_id);

  //       // comprueba que exista la licencia en la DBB
  //       if (licenseFeeBill === null) return res.status(404).json({ error: "No existe una licencia con este ID en la base de datos!" });

  //       const updatedLicenseFeeBill = {
  //         ...oldLicenseFeeBill._doc,
  //         ...req.body,
  //       };
  //       const response = await licenseFeeBillService.update(
  //         _id,
  //         updatedLicenseFeeBill,
  //       );
  //       return res.status(200).json({
  //         isUpdated: true,
  //         response,
  //         data: await licenseFeeBillService.getOne(_id),
  //       });
  //     } catch (error) {
  //       return res.status(500).json({ error });
  //     }
  //   }
}

export default new LicenseFeeBillController();
