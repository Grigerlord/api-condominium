import userModels from "../models/users";
import rolesModels from '../models/userRoles';

const validateUserRole = async (req, res, next) => {
  try {
    const user = await userModels.findOne({ _id: req.uid });
    if (!user) return res.status(404).json({ error: "User not found!" });
    const manager = await rolesModels.findOne({ name: 'manager' });
    const userRoleName = user.roleName;
    if (userRoleName !== manager.name) {
      return res
        .status(403)
        .json({
          msg: "This user is not a manager!",
        });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return null;
};

export default validateUserRole;
