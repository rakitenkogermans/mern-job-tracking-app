import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from '../constants/statusCodes';

const login = (req: Request, res: Response) => {
    res.send('login user');
};
const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body);
        res.status(StatusCodes.CREATED).json({ user });
    } catch (err) {
        next(err);
    }
};
const updateUser = (req: Request, res: Response) => {
    res.send('updateUser');
};

export { login, register, updateUser };
