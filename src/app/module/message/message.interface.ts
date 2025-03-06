import { Types } from 'mongoose';

export interface IMessage {
    message: string;
    senderID: Types.ObjectId;
    receiverID: Types.ObjectId;
}
