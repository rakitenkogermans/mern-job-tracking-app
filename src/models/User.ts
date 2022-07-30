import { Schema, model } from 'mongoose';
import { IUserModel } from '../types/User';
import validator from 'validator';
import { NextFunction } from 'express';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const UserSchema: Schema = new Schema<IUserModel>({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 8,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'lastName',
    },
    location: {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'my city',
    },
});

UserSchema.pre('save', async function (this: IUserModel, next: NextFunction) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    return next();
});

UserSchema.methods.createJWT = function () {
    const user = this as IUserModel;
    return sign({ userId: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as IUserModel;
    const isMatch = await compare(candidatePassword, user.password);
    return isMatch;
};

export default model<IUserModel>('User', UserSchema);
