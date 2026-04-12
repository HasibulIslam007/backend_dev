import express from "express";
import type { Request, Response } from "express";  // 👈 use type-only import

import cors from "cors";
import { router } from "./app/routes/index.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandeler.js";
import "./app/config/passport.js";
import ErrorPage from "./app/middlewares/ErrorPage.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";

import { envVars } from "./app/config/env.js";
const app = express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}
));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1); // trust first proxy for secure cookies behind proxies/load balancers

app.use(cors(
  {
    origin: envVars.FRONTEND_URL.trim(),
    credentials: true,
  }
))


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