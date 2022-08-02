import { Document, Types } from 'mongoose';

export interface IJob {
    company: string;
    position: string;
    status: 'interview' | 'declined' | 'pending';
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship';
    jobLocation: string;
    createdBy: Types.ObjectId;
}

export interface IJobModel extends IJob, Document {}
