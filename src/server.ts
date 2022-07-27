import express, { Express, Request, Response } from 'express';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import authRouter from './routes/authRoutes';
import jobsRouter from './routes/jobsRoutes';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome.');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        app.listen(PORT, () =>
            console.log(`App is listening on port: ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
