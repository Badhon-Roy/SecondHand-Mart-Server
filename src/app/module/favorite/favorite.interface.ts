import { Types } from 'mongoose';

export interface IFavorite {
  product: Types.ObjectId;
  email: string;
}
