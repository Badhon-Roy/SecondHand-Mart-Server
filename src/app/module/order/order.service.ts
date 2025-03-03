/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import { orderSearchableFields } from "./order.constant";
import { IOrder } from "./order.interface";
import OrderModel from './order.model';

//* create order into database
const createOrderIntoDB = async (order: any) => {
    const result = await OrderModel.create(order)
    return result;
}

//* get all order
const getAllOrderFromDB = async (
    query: Record<string, unknown>
) => {
    const orderQuery = new QueryBuilder(
        OrderModel.find().populate('itemID').populate('buyerID').populate('sellerID') ,
        query)
        .search(orderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await orderQuery.modelQuery;
    const meta = await orderQuery.countTotal();
    return {
        result,
        meta
    };
}

//* get single order
const getSingleOrderFromDB = async (orderId: string) => {
    const result = await OrderModel.findById(orderId).populate('itemID').populate('buyerID').populate('sellerID') ;
    if (!result) {
        throw new Error("Order not found");
    }
    return result;
};

//* update order details 
const updateSingleOrderFromDB = async (orderId: string, orderData: IOrder) => {
    const result = await OrderModel.findByIdAndUpdate(orderId, orderData, {
        new: true
    })
    return result;
}

// * delete order form database
const deleteOrderFromDB = async (orderId: string) => {
    const result = await OrderModel.findByIdAndDelete(orderId)
    return result;
}

export const OrderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
    getSingleOrderFromDB,
    updateSingleOrderFromDB,
    deleteOrderFromDB
} 