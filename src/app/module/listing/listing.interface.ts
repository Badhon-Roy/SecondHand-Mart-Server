import { Types } from "mongoose";

export interface IListing {
    title: string;
    description: string;
    price: number;
    condition: 'new' | 'used' | 'refurbished';
    images: string[];
    userID: Types.ObjectId;
    status: 'available' | 'sold';
    category : Types.ObjectId;
}
