import{ model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const orderSchema = new Schema<IOrder>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },        
        region: {
            type: String,
            required: true,
            trim: true,
        },
        streetNameAndHouseNo: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending","completed"],
            required: true,
            default : 'pending'
        },
        itemID: {
            type: Schema.Types.ObjectId,
            ref: 'Listing',
            required: true,
        },
        buyerID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sellerID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        session: {
            type: String
        },
    },
    { timestamps: true }
);


const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;