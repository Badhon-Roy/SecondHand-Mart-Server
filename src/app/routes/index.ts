import { Router } from "express";
import { userRouter } from "../module/user/user.route";
import { listingRouter } from "../module/listing/listing.route";
import { authRouter } from "../module/auth/auth.route";
import { categoryRouter } from "../module/category/category.route";
import { favoriteRouter } from "../module/favorite/favorite.route";

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
    },
    {
        path : '/categories',
        route: categoryRouter
    },
    {
        path : '/favorites',
        route: favoriteRouter
    }
]

moduleRoutes.forEach((route)=> router.use(route.path, route.route))

export default router;