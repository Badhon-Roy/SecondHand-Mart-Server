import QueryBuilder from "../../builder/QueryBuilder";
import { IFavorite } from "./favorite.interface";
import FavoriteModel from './favorite.model';

//* create favorite into database
const createFavoriteProductIntoDB = async (data: IFavorite) => {
    const result = await FavoriteModel.create(data)
    return result;
}

//* get all favorite
const getAllFavoriteProductFromDB = async (
    query: Record<string, unknown>
) => {
    const favoriteQuery = new QueryBuilder(
        FavoriteModel.find().populate('product'),
        query)
        .search(['email'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await favoriteQuery.modelQuery;
    const meta = await favoriteQuery.countTotal();
    return {
        result,
        meta
    };
}

//* get single favorite
const getSingleFavoriteProductFromDB = async (id: string) => {
    const result = await FavoriteModel.findById(id)
        .populate('product')

    if (!result) {
        throw new Error("Product not found");
    }
    return result;
};

// * delete favorite form database
const deleteFavoriteProductFromDB = async (id: string) => {
    const result = await FavoriteModel.findByIdAndDelete(id)
    return result;
}

export const FavoriteServices = {
    createFavoriteProductIntoDB,
    getAllFavoriteProductFromDB,
    getSingleFavoriteProductFromDB,
    deleteFavoriteProductFromDB

} 