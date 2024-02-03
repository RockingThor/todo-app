import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";
import { authMiddleware } from "../src/middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.route("/").get(getAllCategories);
categoryRoutes.route("/create").post(createCategory);

export default categoryRoutes;
