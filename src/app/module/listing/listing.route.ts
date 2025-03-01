import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ListingControllers } from "./listing.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { listingValidations } from "./listing.validation";


const router = Router();

router.post('/', validateRequest(listingValidations.createListingValidationSchema), ListingControllers.createListingProduct)

router.get('/',auth(USER_ROLE.user), ListingControllers.getAllListingProduct)

router.get('/:listingId', ListingControllers.getSingleListingProduct)

router.put('/:listingId', ListingControllers.updateSingleListingProduct)

router.delete('/:listingId',  ListingControllers.deleteListingProduct)

export const listingRouter = router;