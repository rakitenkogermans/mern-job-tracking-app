import { model, Schema } from 'mongoose';
import { IJobModel } from '../types/Job';

const JobSchema: Schema = new Schema<IJobModel>(
    {
        company: {
            type: String,
            required: [true, 'Please provide company'],
            maxLength: 50,
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            maxLength: 100,
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending',
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'remote', 'internship'],
            default: 'full-time',
        },
        jobLocation: {
            type: String,
            default: 'my city',
            requierd: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
);

export default model<IJobModel>('Job', JobSchema);
