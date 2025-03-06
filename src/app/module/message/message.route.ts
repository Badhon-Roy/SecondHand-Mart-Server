import { Router } from 'express';
import { MessageControllers } from './message.controller';

const router = Router();

router.post('/', MessageControllers.createMessage);

router.get('/:userId', MessageControllers.getAllMessage);

router.get('/:receiverID', MessageControllers.getSingleMessage);

router.delete('/:messageId', MessageControllers.deleteMessage);

export const messageRouter = router;
