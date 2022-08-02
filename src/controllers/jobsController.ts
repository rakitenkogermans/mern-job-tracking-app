import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import Job from '../models/Job';
import { StatusCodes } from '../constants/statusCodes';

const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { company, position, status, jobType, jobLocation } = req.body;
        if (!company || !position) {
            throw new BadRequestError('Please provide all values');
        }
        const createdBy = req.body.user.userId;
        const job = await Job.create({ company, position, status, jobType, jobLocation, createdBy });
        res.status(StatusCodes.CREATED).json({ job });
    } catch (err) {
        next(err);
    }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    res.send('delete job');
};

const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    res.send('get all jobs');
};

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    res.send('update job');
};

const showStats = async (req: Request, res: Response) => {
    res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
