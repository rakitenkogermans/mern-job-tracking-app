import { RequestHandler } from 'express';
import { BadRequestError, UnAuthenticatedError } from '../errors';
import Job from '../models/Job';
import { StatusCodes } from '../constants/statusCodes';

const createJob: RequestHandler = async (req, res, next) => {
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

const deleteJob: RequestHandler = async (req, res, next) => {
    res.send('delete job');
};

const getAllJobs: RequestHandler = async (req, res, next) => {
    try {
        const jobs = await Job.find({ createdBy: req.body.user.userId });
        res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
    } catch (err) {
        next(err);
    }
};

const updateJob: RequestHandler = async (req, res, next) => {
    res.send('update job');
};

const showStats: RequestHandler = async (req, res, next) => {
    res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
