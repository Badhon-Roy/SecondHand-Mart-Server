import QueryBuilder from '../../builder/QueryBuilder';
import { IMessage } from './message.interface';
import MessageModel from './message.model';

//* create message into database
const createMessageIntoDB = async (message: IMessage) => {
  const result = await MessageModel.create(message);
  return result;
};


//* get all message
const getAllMessageFromDB = async (userId : string ,query: Record<string, unknown>) => {
  const messageQuery = new QueryBuilder(
    MessageModel.find({receiverID : userId}).populate('senderID').populate('receiverID'),
    query,
  )
    .search(['senderID','receiverID'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await messageQuery.modelQuery;
  const meta = await messageQuery.countTotal();
  return {
    result,
    meta,
  };
};

//* get single favorite
const getSingleMessageFromDB = async (id: string) => {
  const result = await MessageModel.findById(id).populate('senderID').populate('receiverID');

  if (!result) {
    throw new Error('message not found');
  }
  return result;
};

// * delete favorite form database
const deleteMessageFromDB = async (id: string) => {
  const result = await MessageModel.findByIdAndDelete(id);
  return result;
};

export const MessageServices = {
  createMessageIntoDB,
  getAllMessageFromDB,
  getSingleMessageFromDB,
  deleteMessageFromDB,
};
