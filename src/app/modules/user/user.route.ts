import { Router } from "express";
import { User } from "./user.model.js";
import { UserController } from "./user.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createUserZodSchema } from "./user.validation.js";

const router = Router();

// GET used for informational message in browser
router.get("/register", (req, res) => {
  res.json({ message: "register via POST only" });
});

router.get("/users", UserController.getAllUsers);

// actual endpoint for creating a user
router.post("/register",validateRequest(createUserZodSchema), UserController.createUser);

export const UserRoute = router;