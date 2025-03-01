import QueryBuilder from "../../builder/QueryBuilder";
import { ListingSearchableFields } from "./listing.constant";
import { IListing } from "./listing.interface";
import Listing from "./listing.model";

//* create listing product into database
const createListingProductIntoDB = async (product: IListing) => {
    const result = await Listing.create(product)
    return result;
}

//* get all listing product
const getAllListingProductFromDB = async (
    query: Record<string, unknown>
) => {
    const listingQuery = new QueryBuilder(
        Listing.find().populate('userID') ,
        query)
        .search(ListingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await listingQuery.modelQuery;
    const meta = await listingQuery.countTotal();
    return {
        result,
        meta
    };
}

//* get single listing product
const getSingleListingProductFromDB = async (productId: string) => {
    const result = await Listing.findById(productId)
    return result;
}

//* update listing product details 
const updateSingleListingProductFromDB = async (productId: string, listingProductData: IListing) => {
    const result = await Listing.findByIdAndUpdate(productId, listingProductData, {
        new: true
    })
    return result;
}

// * delete listing product form database
const deleteListingProductFromDB = async (productId: string) => {
    const result = await Listing.findByIdAndDelete(productId)
    return result;
}

export const ListingServices = {
    createListingProductIntoDB,
    getAllListingProductFromDB,
    getSingleListingProductFromDB,
    updateSingleListingProductFromDB,
    deleteListingProductFromDB

} 