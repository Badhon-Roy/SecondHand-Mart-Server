import { Router } from "express";
import { OrderControllers } from "./order.controller";


const router = Router();

router.post('/', OrderControllers.createOrder)

router.get('/', OrderControllers.getAllOrder)

router.get('/:id', OrderControllers.getSingleOrder)

router.put('/:id', OrderControllers.updateSingleOrder)

router.delete('/:id',  OrderControllers.deleteOrder)

export const orderRouter = router;