import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../src/middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").post(createCategory);
categoryRoutes.route("/delete/:id").post(deleteCategory);
categoryRoutes.route("/update").put(updateCategory);

export default categoryRoutes;
