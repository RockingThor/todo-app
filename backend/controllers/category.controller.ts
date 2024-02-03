import { Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { CustomReq } from "../src/middleware";

export const getAllCategories = async (req: CustomReq, res: Response) => {
  try {
    const user = req.user;
    const categories = await Category.find({ user });
    return res.status(200).send(categories);
  } catch (err) {
    console.log("Error in getAllCategories: ", err);
    throw err;
  }
};

export const createCategory = async (req: CustomReq, res: Response) => {
  try {
    const { name, isEditable, color, icon }: ICategory = req.body;
    const { user } = req;

    const category = await Category.create({
      name,
      isEditable,
      color,
      icon,
      user,
    });

    if (category) {
      return res.status(200).send("Category created successfully");
    }
  } catch (err) {
    console.log("Error in createCategory: ", err);
    throw err;
  }
};
