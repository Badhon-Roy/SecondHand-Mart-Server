/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { catchAsync } from '../../utils/catchAsync';
import { MessageServices } from './message.service';

// create Message
const createMessage = catchAsync(async (req, res) => {
  const message = req.body;
  const result = await MessageServices.createMessageIntoDB(message);
  res.status(200).json({
    success: true,
    message: 'Message send successfully',
    data: result,
  });
});

// get all Message
const getAllMessage = catchAsync(async (req, res) => {
    const { userId } = req.params; 
    const result = await MessageServices.getAllMessageFromDB(userId , req.query); // Fetch messages
    res.status(200).json({
        message: 'Messages retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.result,
    });
});

//* get single Message
const getSingleMessage = catchAsync(async (req, res) => {
  const { receiverID } = req.params;
  const result = await MessageServices.getSingleMessageFromDB(receiverID);
  res.status(200).json({
    message: 'Message retrieved successfully',
    success: true,
    data: result,
  });
});

// * delete Message
const deleteMessage = catchAsync(async (req, res) => {
  const { messageId } = req.params;
  const result = await MessageServices.deleteMessageFromDB(messageId);
  res.status(200).json({
    message: 'Message delete successfully',
    success: true,
    data: {},
  });
});

export const MessageControllers = {
  createMessage,
  getAllMessage,
  getSingleMessage,
  deleteMessage,
};
