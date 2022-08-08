import { NextFunction, RequestHandler, Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors';
import Job from '../models/Job';
import { StatusCodes } from '../constants/statusCodes';
import { chechPermissions } from '../utils/chechPermissions';
import { Types } from 'mongoose';

const createJob: RequestHandler = async (req, res, next) => {
    try {
        const { company, position, status, jobType, jobLocation } = req.body;
        if (!company || !position) {
            throw new BadRequestError('Please provide all values');
        }
        const createdBy = res.locals.user.userId;
        const job = await Job.create({ company, position, status, jobType, jobLocation, createdBy });
        res.status(StatusCodes.CREATED).json({ job });
    } catch (err) {
        next(err);
    }
};

const deleteJob: RequestHandler = async (req, res, next) => {
    try {
        const { id: jobId } = req.params;

        const job = await Job.findOne({ _id: jobId });
        if (!job) {
            throw new NotFoundError(`No job with id: ${jobId}`);
        }

        chechPermissions(res.locals.user.userId, job.createdBy);

        await job.remove();

        res.status(StatusCodes.OK).json({ msg: 'Success! Job removed.' });
    } catch (err) {
        next(err);
    }
};

const getAllJobs = async (
    req: Request<{}, {}, {}, { status: string; jobType: string; sort: string; search: string; page: number; limit: number }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { status, jobType, sort, search } = req.query;
        const queryObject: { [key: string]: any } = {
            createdBy: res.locals.user!.userId,
        };

        if (status && status !== 'all') {
            queryObject.status = status;
        }

        if (jobType && jobType !== 'all') {
            queryObject.jobType = jobType;
        }

        if (search) {
            queryObject.position = { $regex: search, $options: 'i' };
        }

        let result = Job.find(queryObject);

        if (sort === 'latest') {
            result = result.sort('-createdAt');
        }
        if (sort === 'oldest') {
            result = result.sort('createdAt');
        }
        if (sort === 'a-z') {
            result = result.sort('position');
        }
        if (sort === 'z-a') {
            result = result.sort('-position');
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);

        const [jobs, totalJobs] = await Promise.all([result, Job.countDocuments(queryObject)]);
        const numOfPages = Math.ceil(totalJobs / limit);

        res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
    } catch (err) {
        next(err);
    }
};

const updateJob: RequestHandler = async (req, res, next) => {
    try {
        const { id: jobId } = req.params;
        const { company, position, status, jobType, jobLocation } = req.body;
        if (!company || !position) {
            throw new BadRequestError('Please provide all values');
        }

        const job = await Job.findOne({ _id: jobId });
        if (!job) {
            throw new NotFoundError(`No job with id: ${jobId}`);
        }

        chechPermissions(res.locals.user.userId, job.createdBy);

        // const updatedJob = await Job.findOneAndUpdate(
        //     { _id: jobId },
        //     { company, position, status, jobType, jobLocation },
        //     { new: true, runValidators: true }
        // );

        job.company = company || job.company;
        job.position = position || job.position;
        job.status = status || job.status;
        job.jobType = jobType || job.jobType;
        job.jobLocation = jobLocation || job.jobLocation;
        await job.save();

        res.status(StatusCodes.OK).json({ job });
    } catch (err) {
        next(err);
    }
};

const showStats: RequestHandler = async (req, res, next) => {
    try {
        let stats: any = await Job.aggregate([
            { $match: { createdBy: new Types.ObjectId(res.locals.user.userId) } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        stats = stats.reduce((acc: any, value: any) => {
            const { _id: title, count } = value;
            acc[title] = count;
            return acc;
        }, {});

        const defaultStats = {
            pending: stats.pending || 0,
            interview: stats?.interview || 0,
            declined: stats?.declined || 0,
        };

        let monthlyApplications: any[] = await Job.aggregate([
            { $match: { createdBy: new Types.ObjectId(res.locals.user.userId) } },
            {
                $group: {
                    _id: {
                        year: {
                            $year: '$createdAt',
                        },
                        month: {
                            $month: '$createdAt',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 },
        ]);
        monthlyApplications = monthlyApplications
            .map((item) => {
                const {
                    _id: { year, month },
                    count,
                } = item;
                const date = new Date(`${year}-${month}`).toLocaleDateString('en-us', { year: 'numeric', month: 'short' });
                return { date, count };
            })
            .reverse();
        res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
    } catch (err) {
        next(err);
    }
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
