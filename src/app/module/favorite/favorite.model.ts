import { model, Schema } from 'mongoose';
import { IFavorite } from './favorite.interface';

const favoriteSchema = new Schema<IFavorite>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const FavoriteModel = model<IFavorite>('Favorite', favoriteSchema);

export default FavoriteModel;
