import { Request, Response } from 'express';

const createJob = (req: Request, res: Response) => {
    res.send('create job');
};

const deleteJob = (req: Request, res: Response) => {
    res.send('delete job');
};

const getAllJobs = (req: Request, res: Response) => {
    res.send('get all jobs');
};

const updateJob = (req: Request, res: Response) => {
    res.send('update job');
};

const showStats = (req: Request, res: Response) => {
    res.send('show stats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
