import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createDivisionValidation, updateDivisionValidation } from "./division.validation.js";
import { DivisionController } from "./division.controller.js";
import { multerUpload } from "../../config/multer.config.js";
const router = Router();
router.post("/create", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), multerUpload.single("file"), validateRequest(createDivisionValidation), DivisionController.createDivision);
router.get("/", DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision);
router.patch("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(updateDivisionValidation), DivisionController.updateDivision);
router.delete("/:id", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DivisionController.deleteDivision);
export const DivisionRoute = router;
//# sourceMappingURL=division.route.js.map