import expresss from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const userRoutes = expresss.Router();

userRoutes.route("/create").post(createUser);
userRoutes.route("/login").post(loginUser);

export default userRoutes;
