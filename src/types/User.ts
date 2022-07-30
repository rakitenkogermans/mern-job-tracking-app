import { Document } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    location: string;
    lastName: string;
}

export interface IUserModel extends IUser, Document {
    createJWT: () => string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
