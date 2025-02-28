import { ObjectId } from "mongoose";

export interface IListing {
    title: string;
    description: string;
    price: number;
    condition: 'new' | 'used' | 'refurbished';
    images: string[];
    userID: ObjectId;
    status: 'available' | 'sold';
}
