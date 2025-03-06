import { Types } from 'mongoose';

export interface IOrder {
  name: string;
  city: string;
  phoneNumber: string;
  postalCode: string;
  price: number;
  region: string;
  streetNameAndHouseNo: string;
  status: 'pending' | 'completed';
  itemID: Types.ObjectId;
  buyerID: Types.ObjectId;
  sellerID: Types.ObjectId;
  session?: string;
}
