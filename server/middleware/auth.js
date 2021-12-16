import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({
        error: "Login or Signup to Continue",
      });
    } else {
      const isCustomAuth = accessToken.length < 500;
      let decodedData;

      if (accessToken && isCustomAuth) {
        decodedData = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userId = decodedData?.userId;

        if (decodedData?.exp < Date.now().valueOf() / 1000)
          return res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one",
          });
      } else {
        decodedData = jwt.decode(accessToken);

        req.userId = decodedData?.sub;
      }
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};
