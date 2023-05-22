// import moment from "moment-timezone";
import LogHistoryModels from "../models/logHistory";

// const today = moment().tz("America/Caracas").format("YYYY-MM-DD");

class LogHistoryControllers {
  /**
    =============CREATE ITEM HISTORY (RECORD)===========================
  */
  async createRecord(details) {
    try {
      const {
        userId,
        domain,
        typeOperation,
        request,
      } = details;

      const record = await LogHistoryModels.create({
        userId,
        domain,
        typeOperation,
        request,
      });

      await record.save();

      return {
        msg: 'Record save!',
      };
    } catch (error) {
      return {
        msg: 'failed to create record',
        error,
      };
    }
  }

  /**
    ======================GET RECORDS==================================
  */
  async getRecords(req, res) {
    const records = await LogHistoryModels.find();

    return res.status(200).json({
      msg: "Success",
      records,
    });
  }
}

export default new LogHistoryControllers();
