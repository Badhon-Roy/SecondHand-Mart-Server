import { Router } from "express";
import { FavoriteControllers } from "./favorite.controller";

const router = Router();

router.post('/', FavoriteControllers.createFavorite)

router.get('/', FavoriteControllers.getAllFavorite)

router.get('/:id', FavoriteControllers.getSingleFavorite)

router.delete('/:id',  FavoriteControllers.deleteFavorite)

export const favoriteRouter = router;