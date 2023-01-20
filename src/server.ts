import express, { Express, Request, Response } from 'express';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authenticateUser from './middleware/auth';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connect';
import authRouter from './routes/authRoutes';
import jobsRouter from './routes/jobsRoutes';
import path from 'path';
import helmet from 'helmet';
// @ts-ignore
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

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
