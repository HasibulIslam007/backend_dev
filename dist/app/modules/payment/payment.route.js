import express from "express";
import { PaymentController } from "./payment.controller.js";
const router = express.Router();
router.post("/init-payment/:bookingId", PaymentController.initPayment);
router.post("/success", PaymentController.successPayment);
router.get("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.get("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
router.get("/cancel", PaymentController.cancelPayment);
router.post("/validate-payment", PaymentController.validatePayment);
export const PaymentRoute = router;
//# sourceMappingURL=payment.route.js.map