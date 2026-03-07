import express, { Router } from "express";
import type { Request, Response } from "express";  // 👈 use type-only import
import { User } from "./app/modules/user/user.model.js";
import { UserRoute } from "./app/modules/user/user.route.js";
import cors from "cors";
import { router } from "./app/routes/index.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandeler.js";
import httpStatus from "http-status-codes";
import { success } from "zod";
import ErrorPage from "./app/middlewares/ErrorPage.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors())


app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the Tour Project API" });
});
app.use(globalErrorHandler);
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
})

app.use(ErrorPage); 
export default app;