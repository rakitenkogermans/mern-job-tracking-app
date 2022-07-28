import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from '../constants/statusCodes';
import { BadRequestError } from '../errors';

const login = (req: Request, res: Response) => {
    res.send('login user');
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new BadRequestError('please provide all values');
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in use');
        }
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
