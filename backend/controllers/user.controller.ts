import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../types";

const generateToken = (_id: string | Types.ObjectId) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.find({ email });
    // console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(409).send("User already exist with the mail id");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).send("User created successfully");
    }
  } catch (err) {
    console.log("Error in createUser: ", err);
    throw err;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUser = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);

    if (isPassword) {
      const token = generateToken(existingUser._id);
      return res.status(200).send({
        token,
        user: { email: existingUser.email, name: existingUser.name },
      });
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.log("Error in loginUser: ", err);
    throw err;
  }
};
