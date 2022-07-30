import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from '../constants/statusCodes';
import { BadRequestError, UnAuthenticatedError } from '../errors';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('please provide all values');
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new UnAuthenticatedError('Invalid credentials');
        }
        console.log(user);
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new UnAuthenticatedError('Invalid credentials');
        }
        const token = user.createJWT();

        res.status(StatusCodes.OK).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
            },
            token,
            location: user.location,
        });
    } catch (err) {
        next(err);
    }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new BadRequestError('Please provide all values');
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            throw new BadRequestError('Email already in use');
        }
        const user = await User.create({ name, email, password });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
            },
            token,
            location: user.location,
        });
    } catch (err) {
        next(err);
    }
};

const updateUser = (req: Request, res: Response) => {
    res.send('updateUser');
};

export { login, register, updateUser };
