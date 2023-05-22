/**
 * En primer lugar, debemos crear el esquema. Este es un modelo que se convertira en un documento en nuestra base de datos no relacional
 * Para hacerlo de esta manera es necesaria la imoportacion de mongoose
 */

import mongoose from 'mongoose';

const AnimalsSchemas = new mongoose.Schema({
  name: { type: String, default: "" },
  family: { type: String, default: "" },
  description: { type: String, default: "" },
  age: { type: Number, default: 0 },
  createdAt: { type: String, default: "" },
  updatedAt: { type: String, default: "" },
});

module.exports = mongoose.model("animals", AnimalsSchemas);