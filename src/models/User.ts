import { Schema, model } from 'mongoose';
import { IUser } from '../types/User';
import validator from 'validator';

const UserSchema: Schema = new Schema({
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

export default model<IUser>('User', UserSchema);
