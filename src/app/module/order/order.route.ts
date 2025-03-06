import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/', OrderControllers.createOrder);

router.get('/', OrderControllers.getAllOrder);
router.get('/:id', OrderControllers.getSingleOrder);

router.get('/purchases/:userId', OrderControllers.getPurchaseHistory);
router.get('/purchases/:userId/:id', OrderControllers.getSinglePurchaseHistory);

router.get('/sales/:userId', OrderControllers.getSalesHistory);
router.get('/sales/:userId/:id', OrderControllers.getSingleSalesHistory);

router.put('/:id', OrderControllers.updateSingleOrder);
router.put('/:orderId/status', OrderControllers.updateOrderStatus);

router.delete('/:id', OrderControllers.deleteOrder);

export const orderRouter = router;
