import jwt from "jsonwebtoken";

const generateToken = (uid) => {
  // const expiresIn = Math.floor(Math.random() * 15
  // const expiresIn = 60 * 15;
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const accessToken = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { accessToken, expiresIn };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default generateToken;