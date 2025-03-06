/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import AppError from '../../errors/appError';
import { catchAsync } from '../../utils/catchAsync';
import FavoriteModel from './favorite.model';
import { FavoriteServices } from './favorite.service';

// create Favorite
const createFavorite = catchAsync(async (req, res) => {
  const data = req.body;
  const existData = await FavoriteModel.findOne({
    product: data?.product,
    email: data?.email,
  });
  if (existData) {
    throw new AppError(404, 'Product already add to favorite!');
  } else {
    const result = await FavoriteServices.createFavoriteProductIntoDB(data);
    res.status(200).json({
      success: true,
      message: 'Add to favorite successfully',
      data: result,
    });
  }
});

// get all Favorite
const getAllFavorite = catchAsync(async (req, res) => {
  const result = await FavoriteServices.getAllFavoriteProductFromDB(req.query);
  res.status(200).json({
    message: 'Favorites are retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.result,
  });
});

//* get single Favorite
const getSingleFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FavoriteServices.getSingleFavoriteProductFromDB(id);
  res.status(200).json({
    message: 'Favorite retrieved successfully',
    success: true,
    data: result,
  });
});

// * delete Favorite
const deleteFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FavoriteServices.deleteFavoriteProductFromDB(id);
  res.status(200).json({
    message: 'Favorite delete successfully',
    success: true,
    data: {},
  });
});

export const FavoriteControllers = {
  createFavorite,
  getAllFavorite,
  getSingleFavorite,
  deleteFavorite,
};
