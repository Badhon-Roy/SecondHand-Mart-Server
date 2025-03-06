/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderSearchableFields } from './order.constant';
import { IOrder } from './order.interface';
import OrderModel from './order.model';
import Listing from '../listing/listing.model';

//* create order into database
const createOrderIntoDB = async (order: any) => {
  const result = await OrderModel.create(order);
  return result;
};

//* get all order
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    OrderModel.find()
      .populate('itemID')
      .populate('buyerID')
      .populate('sellerID'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return {
    result,
    meta,
  };
};

//* get single order
const getSingleOrderFromDB = async (orderId: string) => {
  const result = await OrderModel.findById(orderId)
    .populate('itemID')
    .populate('buyerID')
    .populate('sellerID');
  if (!result) {
    throw new Error('Order not found');
  }
  return result;
};

// Service to fetch purchase history
const fetchPurchaseHistory = async (userId: string) => {
  const result = await OrderModel.find({ buyerID: userId })
    .populate('itemID')
    .populate('sellerID');
  return result;
};

const fetchSinglePurchaseHistory = async (orderId: string, userId: string) => {
  const result = await OrderModel.findOne({ _id: orderId, buyerID: userId })
    .populate('itemID')
    .populate('sellerID');

  return result;
};

// Service to fetch sales history
const fetchSalesHistory = async (userId: string) => {
  const result = await OrderModel.find({ sellerID: userId })
    .populate('itemID')
    .populate('buyerID');
  return result;
};

const fetchSingleSalesHistory = async (orderId: string, userId: string) => {
  const result = await OrderModel.findOne({ _id: orderId, sellerID: userId })
    .populate('itemID')
    .populate('buyerID');

  return result;
};

//* update order details
const updateSingleOrderFromDB = async (orderId: string, orderData: IOrder) => {
  const result = await OrderModel.findByIdAndUpdate(orderId, orderData, {
    new: true,
  });
  return result;
};

// update order status
const updateOrderStatusFromDB = async (
  sellerID: string | Types.ObjectId,
  orderId: string | Types.ObjectId,
  status: 'pending' | 'completed',
): Promise<IOrder | null> => {
  try {
    // Validate IDs before querying
    if (
      !mongoose.Types.ObjectId.isValid(sellerID) ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      throw new Error('Invalid ObjectId provided');
    }

    // Convert to ObjectId
    const sellerObjectId = new mongoose.Types.ObjectId(sellerID);
    const orderObjectId = new mongoose.Types.ObjectId(orderId);

    const order = await OrderModel.findOne({
      sellerID: sellerObjectId,
      _id: orderObjectId,
    });

    if (!order) {
      return null;
    }

    order.status = status;
    const item = await Listing.findOne({ _id: order?.itemID });

    if (!item) {
      throw new Error('Item not found');
    }
    item.status = 'sold';

    await item.save();
    await order.save();
    return order;
  } catch (error) {
    throw new Error('Error updating order status: ' + error);
  }
};

// * delete order form database
const deleteOrderFromDB = async (orderId: string) => {
  const result = await OrderModel.findByIdAndDelete(orderId);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getSingleOrderFromDB,
  fetchPurchaseHistory,
  fetchSinglePurchaseHistory,
  fetchSalesHistory,
  fetchSingleSalesHistory,
  updateOrderStatusFromDB,
  updateSingleOrderFromDB,
  deleteOrderFromDB,
};
