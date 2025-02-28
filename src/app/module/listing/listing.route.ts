import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { listingValidationSchema } from "./listing.validation";
import { ListingControllers } from "./listing.controller";


const router = Router();

router.post('/', validateRequest(listingValidationSchema), ListingControllers.createListingProduct)
router.get('/', ListingControllers.getAllListingProduct)
router.get('/:listingId',
    ListingControllers.getSingleListingProduct)

export const listingRouter = router;