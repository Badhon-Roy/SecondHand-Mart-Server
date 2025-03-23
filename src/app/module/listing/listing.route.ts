import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ListingControllers } from './listing.controller';
import { listingValidations } from './listing.validation';

const router = Router();

router.post(
  '/',
  validateRequest(listingValidations.createListingValidationSchema),
  ListingControllers.createListingProduct,
);

router.get('/', ListingControllers.getAllListingProduct);

router.get('/:listingId', ListingControllers.getSingleListingProduct);

router.put('/:listingId', ListingControllers.updateSingleListingProduct);
router.put('/add-discount/:listingId', ListingControllers.addDiscount);

router.delete('/:listingId', ListingControllers.deleteListingProduct);

export const listingRouter = router;
