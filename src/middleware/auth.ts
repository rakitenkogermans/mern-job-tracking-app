import { Request, NextFunction, Response } from 'express';
import { UnAuthenticatedError } from '../errors';
import { verify } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnAuthenticatedError('Authentication Invalid');
    }
    try {
        const payload: any = verify(token, process.env.JWT_SECRET || '');

        res.locals.user = { userId: payload.userId as string };
        next();
    } catch (err) {
        throw new UnAuthenticatedError('Authentication Invalid');
    }
};

export default auth;
