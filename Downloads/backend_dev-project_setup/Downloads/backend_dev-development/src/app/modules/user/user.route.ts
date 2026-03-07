import { Router } from "express";
import { User } from "./user.model.js";
import { UserController } from "./user.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createUserZodSchema } from "./user.validation.js";
import type { Request, Response, NextFunction } from "express";
import AppError from "../../errorHelper/AppError.js";
import jwt from "jsonwebtoken";
const router = Router();
import { verifyToken } from "../../utils/jwt.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "./user.interface.js";

// GET used for informational message in browser
router.get("/register", (req, res) => {
  res.json({ message: "register via POST only" });
});

router.get("/users", UserController.getAllUsers);

// actual endpoint for creating a user
router.post("/register",validateRequest(createUserZodSchema), UserController.createUser);

router.get(
  "/all-users",
   checkAuth(UserRole.ADMIN,UserRole.SUPER_ADMIN),UserController.getAllUsers    
);
router.patch("/:id",  checkAuth(...Object.values(UserRole)), UserController.updateUser)
export const UserRoute = router;