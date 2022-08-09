import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../constants/statusCodes';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

const errorHandlerMiddleware = (err: Error.ValidationError | ErrorRequestHandler | MongoError, req: Request, res: Response, next: NextFunction) => {
    const defaultError = {
        // @ts-ignore
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        // @ts-ignore
        msg: err.message || 'Something went wrong, try again later',
    };
    if (err.name === 'ValidationError' && err instanceof Error.ValidationError) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
    }
    if ((err as MongoError).code === 11000 && err instanceof MongoError) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // @ts-ignore
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
