import userModels from "../models/users";
import rolesModels from '../models/userRoles';

const isAdministrator = async (req, res, next) => {
  try {
    const user = await userModels.findOne({ _id: req.uid });
    if (!user) return res.status(404).json("User is not exist!");
    const administrator = await rolesModels.findOne({ name: 'administrator' });
    const userRoleName = user.roleName;
    if (userRoleName !== administrator.name) {
      return res
        .status(403)
        .json({
          msg: "This user is not a administrator!",
        });
    }
    next();
  } catch (error) {
    return res.staus(500).json({ message: error.message });
  }
  return null;
};

export default isAdministrator;