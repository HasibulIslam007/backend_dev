import { Router } from "express";
import path from "node:path";
import { UserRoute } from "../modules/user/user.route.js";
import { AuthRoute } from "../modules/auth/auth.route.js";


export const router = Router();

const modulesRoutes = [
    {
        path: "/users",
        route :  UserRoute
    },
    {
        path: "/auth",
        route: AuthRoute
    }
]

modulesRoutes.forEach((route)=>{
    router.use(route.path, route.route);
})

export const IndexRoute = router;