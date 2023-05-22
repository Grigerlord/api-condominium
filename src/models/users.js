import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';
import bcryptjs from 'bcryptjs';
// import userRoles from './userRoles';

const usersSchemas = new mongoose.Schema({
  firstName: { type: String, default: 'user' },
  lastName: { type: String, default: '' },
  userName: { type: String, default: 'User' },
  email: {
    type: String,
    default: '',
    required: [true, 'Required email!'],
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
  },
  password: { type: String, default: '', required: [true, 'Required password!'] },
  identDocument: {
    type: String,
    default: '',
    unique: true,
    required: [
      true,
      'Ident document required!',
    ],
  },
  phoneNumber: { type: String, default: '' },
  address: {
    type: Object,
    default: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  },
  roleName: { type: String, default: 'administrator' },
  licenses: { type: String, default: 'freeLicense' },
  roleId: { type: Schema.Types.ObjectId, ref: 'userRoles' },
  company: { type: String, default: '' },
  deletedAt: { type: String, default: null },
  createdAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
});

const today = moment().tz('America/Caracas').format('DD-MM-YYYY h:mm:ss a');
usersSchemas.pre("save", function () {
  if (!this.createdAt) {
    this.createdAt = today;
  }
});

usersSchemas.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: today });
});

usersSchemas.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);

    next();
  } catch (error) {
    throw new Error("Failed to password hash");
  }

  return null;
});

usersSchemas.pre('save', async function () {
  if (this.company === '') this.company = this.userName;
});

// usersSchemas.methods.getRole = async function () {
//   const data = Object.assign({}, ...this._doc);
//   data.role = await userRoles.findOne({ _id: data.roleId });
//   return data;
// };

usersSchemas.methods.comparePassword = function (frontendPassword) {
  return bcryptjs.compare(frontendPassword, this.password);
};

module.exports = mongoose.model("users", usersSchemas);