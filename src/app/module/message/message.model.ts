import { model, Schema } from 'mongoose';
import { IMessage } from './message.interface';

const messageSchema = new Schema<IMessage>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    senderID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const MessageModel = model<IMessage>('Message', messageSchema);

export default MessageModel;
