import express, { Application, Request, Response } from 'express';
import cors from "cors"
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000'] }));

//* application related api
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('🎉 Welcome to SecondHand-Mart');
});

app.use(globalErrorHandler)

export default app;
