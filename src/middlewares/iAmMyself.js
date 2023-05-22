const iAmMyself = async (req, res, next) => {
  try {
    if (req.uid === req.params._id) {
      next();
    } else {
      throw new Error("No tienes permisos para hacer modificaciones a la informacion de otro usuario");
    }
  } catch (errors) {
    return res.status(400).json({
      error: errors.message,
    });
  }
  return null;
};

export default iAmMyself;
