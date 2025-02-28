import { Router } from "express";
import { userRouter } from "../module/user/user.route";
import { listingRouter } from "../module/listing/listing.route";
import { authRouter } from "../module/auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path : '/users',
        route: userRouter
    },
    {
        path : '/listings',
        route: listingRouter
    },
    {
        path : '/auth',
        route: authRouter
    }
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))

export default router;