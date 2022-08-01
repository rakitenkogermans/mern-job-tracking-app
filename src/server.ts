import express, { Express, Request, Response } from 'express';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authenticateUser from './middleware/auth';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connect';
import authRouter from './routes/authRoutes';
import jobsRouter from './routes/jobsRoutes';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Welcome.');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();
