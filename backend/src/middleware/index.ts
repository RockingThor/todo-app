import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user-model";

export interface CustomReq extends Request {
  user: string;
}

export const authMiddleware = async (
  req: CustomReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.headers;
    if (!auth) {
      return res.status(401).send("Unauthorized");
    }
    const token = auth;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    const user = User.findById(_id);
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    req.user = (await user).id;
    next();
  } catch (err) {
    console.log("Error in authMiddleware: ", err);
    throw err;
  }
};
