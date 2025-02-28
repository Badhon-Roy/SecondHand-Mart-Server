import { catchAsync } from "../../utils/catchAsync";
import { ListingServices } from "./listing.service";



// create listing product
const createListingProduct = catchAsync(async (req, res) => {
    const product = req.body;
    const result = await ListingServices.createListingProductIntoDB(product)
    res.status(200).json({
        success: true,
        message: "Listing Product created successfully",
        data: result
    })
})

// get all listing product
const getAllListingProduct = catchAsync(async (req, res) => {
    const result = await ListingServices.getAllListingProductFromDB(
        req.query
    )
    res.status(200).json({
        message: 'Listing products are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
})

//* get single listing product 
const getSingleListingProduct = catchAsync(async (req, res) => {
    const { listingId } = req.params;
    console.log(listingId);
    const result = await ListingServices.getSingleListingProductFromDB(listingId)
    console.log(result);
    res.status(200).json({
        message: 'Listing product retrieved successfully',
        success: true,
        data: result,
    })

})

export const ListingControllers = {
    createListingProduct,
    getAllListingProduct,
    getSingleListingProduct
}