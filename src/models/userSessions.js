import mongoose from 'mongoose';

const SessionSchemas = new mongoose.Schema({
  emailUser: { type: String, unique: true },
  passUser: { type: String, unique: true },
  idUser: { type: String, default: "" },
  idRole: { type: String, default: "" },
  idStatus: { type: String, default: "" },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },

});

module.exports = mongoose.model("sessions", SessionSchemas);