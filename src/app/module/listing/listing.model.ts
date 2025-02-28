import mongoose, { model, Schema } from "mongoose";
import { IListing } from "./listing.interface";


const listingSchema = new Schema<IListing>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        condition: {
            type: String,
            enum: ['new', 'used', 'refurbished'],
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['available', 'sold'],
            required: true,
            default: 'available',
        },
    },
    { timestamps: true }
);


const Listing = model<IListing>('Listing', listingSchema);

export default Listing;