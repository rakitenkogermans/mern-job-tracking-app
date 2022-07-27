import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
    res.send('login user');
};
const register = (req: Request, res: Response) => {
    res.send('register user');
};
const updateUser = (req: Request, res: Response) => {
    res.send('updateUser');
};

export { login, register, updateUser };
