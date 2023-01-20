import { Request, Response, NextFunction } from 'express';
import { UnAuthenticatedError } from '../errors';
import { verify } from 'jsonwebtoken';

// declare module "express-serve-static-core" {
//     interface Request {
//         user: { userId: string };
//     }
// }

const auth = (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    //     throw new UnAuthenticatedError('Authentication Invalid');
    // }
    // const token = authHeader.split(' ')[1];

    const token = req.cookies.token;
    if (!token) {
        throw new UnAuthenticatedError('Authentication Invalid');
    }
    try {
        const payload: any = verify(token, process.env.JWT_SECRET || '');

        res.locals.user = { userId: payload.userId };
        next();
    } catch (err) {
        throw new UnAuthenticatedError('Authentication Invalid');
    }
};

export default auth;
