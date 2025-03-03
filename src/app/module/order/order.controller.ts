/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import Stripe from "stripe";
import { catchAsync } from "../../utils/catchAsync";
import { OrderServices } from "./order.service";
import User from "../user/user.model";
import Listing from "../listing/listing.model";
import OrderModel from "./order.model";
import { NextFunction, Request, Response } from "express";



const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = req.body;
        const user = await User.findById(order?.buyerID);
        const product = await Listing.findById(order?.itemID);
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/order/${product?._id}`,
            customer_email: user?.email,
            client_reference_id: req?.params?.productId,
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        unit_amount: Math.round(parseFloat(order?.price) * 100),
                        product_data: {
                            name: product?.title,
                            description: product?.description,
                            images: [product?.images[0]],
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        // Create new order in your database
        const newOrder = new OrderModel({
            name: order?.name,
            city: order?.city,
            phoneNumber: order?.phoneNumber,
            postalCode: order?.postalCode,
            price: order?.price,
            region: order?.region,
            streetNameAndHouseNo: order?.streetNameAndHouseNo,
            status: "pending",
            itemID: order?.itemID,
            buyerID: order?.buyerID,
            sellerID: order?.sellerID,
            session: session.id,
        });

        // Save order in database
        await newOrder.save();
        const result = await OrderServices.createOrderIntoDB(newOrder);


        res.status(200).json({
            message: 'Order retrieved successfully',
            success: true,
            session,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};












// get all Order
const getAllOrder = catchAsync(async (req, res) => {
    const result = await OrderServices.getAllOrderFromDB(
        req.query
    )
    res.status(200).json({
        message: 'Orders are retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    })
})

//* get single Order 
const getSingleOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log('id -', id);
    const result = await OrderServices.getSingleOrderFromDB(id)
    res.status(200).json({
        message: 'Order retrieved successfully',
        success: true,
        data: result,
    })
})

// * update single Order
const updateSingleOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const orderData = req.body;
    const result = await OrderServices.updateSingleOrderFromDB(id, orderData)
    res.status(200).json({
        message: 'Order update successfully',
        success: true,
        data: result,
    })
})

// * delete Order
const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OrderServices.deleteOrderFromDB(id)
    res.status(200).json({
        message: 'Order delete successfully',
        success: true,
        data: {},
    })
})

export const OrderControllers = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateSingleOrder,
    deleteOrder
}