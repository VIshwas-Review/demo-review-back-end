import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from 'express'

export const auth = async (req: Request,   res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[0];
    if (!accessToken) {
      return res.status(401).json({
        error: "Login or Signup to Continue",
      });
    } else {
      const isCustomAuth = accessToken.length < 500;
      let decodedData:any;

      if (accessToken && isCustomAuth) {
        decodedData = jwt.verify(accessToken, process.env.JWT_SECRET as string);
        req.params.userId = decodedData?.userId;

        if (decodedData?.exp < Date.now().valueOf() / 1000)
          return res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one",
          });
      } else {
        decodedData = jwt.decode(accessToken);

        req.params.userId = decodedData?.sub;
      }
      next();
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
