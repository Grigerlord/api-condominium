import jwt from "jsonwebtoken";

const generateRefreshToken = (uid, res) => {
  // const expiresIn = Math.floor(Math.random() * 15
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
      sameSite: "none",
    });
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default generateRefreshToken;
