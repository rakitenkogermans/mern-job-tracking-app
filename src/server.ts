import express, { Express, Request, Response } from 'express';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    throw Error('error');
    res.send('Welcome.');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
