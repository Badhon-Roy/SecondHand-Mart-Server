/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/appError';
import { ListingSearchableFields } from './listing.constant';
import { IListing } from './listing.interface';
import Listing from './listing.model';

//* create listing product into database
const createListingProductIntoDB = async (product: IListing) => {
  const result = await Listing.create(product);
  return result;
};

//* get all listing product
const getAllListingProductFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, categories, conditions, statuses, ...pQuery } =
    query;

  const filter: Record<string, any> = {};
  const parseArrayQuery = (param: unknown): string[] => {
    if (!param) return [];
    if (typeof param === 'string') return param.split(',');
    if (Array.isArray(param)) return param;
    return [param.toString()];
  };
  const categoryArray = parseArrayQuery(categories);
  if (categoryArray.length) filter.category = { $in: categoryArray };
  const conditionsArray = parseArrayQuery(conditions);
  if (conditionsArray.length) filter.condition = { $in: conditionsArray };
  const statusesArray = parseArrayQuery(statuses);
  if (statusesArray.length) filter.status = { $in: statusesArray };
  const listingQuery = new QueryBuilder(
    Listing.find(filter).populate('userID').populate('category'),
    pQuery,
  )
    .search(ListingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const result = await listingQuery.modelQuery.lean();
  const meta = await listingQuery.countTotal();

  return { result, meta };
};

//* get single listing product
const getSingleListingProductFromDB = async (productId: string) => {
  const result = await Listing.findById(productId)
    .populate('userID')
    .populate('category');

  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

//* update listing product details
const updateSingleListingProductFromDB = async (
  productId: string,
  listingProductData: IListing,
) => {
  const result = await Listing.findByIdAndUpdate(
    productId,
    listingProductData,
    {
      new: true,
    },
  );
  return result;
};

// * delete listing product form database
const deleteListingProductFromDB = async (productId: string) => {
  const result = await Listing.findByIdAndDelete(productId);
  return result;
};

const addDiscountPrice = async (
  productId: string,
  discountValue: number,
) => {
  if (typeof discountValue !== 'number' || discountValue < 0) {
    throw new AppError(404, 'Invalid discount value');
  }

  // Find the product by ID
  const product = await Listing.findById(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  // Calculate the discounted price
  const originalPrice = product?.price;
  const discountAmount = (originalPrice * discountValue) / 100;
  let newPrice;
  if (discountAmount > 1) {
    newPrice = originalPrice - discountAmount;
  } else {
    newPrice = 0
  }


  const result = await Listing.findByIdAndUpdate(
    productId,
    {
      discount: discountValue,
      discountPrice: newPrice
    },
    {
      new: true,
    }
  );
  return result;
};


export const ListingServices = {
  createListingProductIntoDB,
  getAllListingProductFromDB,
  getSingleListingProductFromDB,
  updateSingleListingProductFromDB,
  deleteListingProductFromDB,
  addDiscountPrice
};
