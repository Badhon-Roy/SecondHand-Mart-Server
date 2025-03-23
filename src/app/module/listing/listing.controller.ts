/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { catchAsync } from '../../utils/catchAsync';
import { ListingServices } from './listing.service';

// create listing product
const createListingProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ListingServices.createListingProductIntoDB(product);
  res.status(200).json({
    success: true,
    message: 'Listing Product created successfully',
    data: result,
  });
});

// get all listing product
const getAllListingProduct = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListingProductFromDB(req.query);
  res.status(200).json({
    message: 'Listing products are retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.result,
  });
});

//* get single listing product
const getSingleListingProduct = catchAsync(async (req, res) => {
  const { listingId } = req.params;
  const result = await ListingServices.getSingleListingProductFromDB(listingId);
  res.status(200).json({
    message: 'Listing product retrieved successfully',
    success: true,
    data: result,
  });
});

// * update single listing product
const updateSingleListingProduct = catchAsync(async (req, res) => {
  const { listingId } = req.params;
  const listingProductData = req.body;
  const result = await ListingServices.updateSingleListingProductFromDB(
    listingId,
    listingProductData,
  );
  res.status(200).json({
    message: 'Listing product update successfully',
    success: true,
    data: result,
  });
});

// * delete listing product
const deleteListingProduct = catchAsync(async (req, res) => {
  const { listingId } = req.params;
  const result = await ListingServices.deleteListingProductFromDB(listingId);
  res.status(200).json({
    message: 'Listing product delete successfully',
    success: true,
    data: {},
  });
});

//* add discount
const addDiscount = catchAsync(async (req, res) => {
  const { listingId } = req.params;
  const {discount} = req.body;
  const result = await ListingServices.addDiscountPrice(listingId, discount)
  res.status(200).json({
    message: 'Add discount successfully',
    success: true,
    data: result,
  });
})

export const ListingControllers = {
  createListingProduct,
  getAllListingProduct,
  getSingleListingProduct,
  updateSingleListingProduct,
  deleteListingProduct,
  addDiscount
};
