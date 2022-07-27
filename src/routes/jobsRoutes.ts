import express from 'express';
import {
    createJob,
    deleteJob,
    getAllJobs,
    showStats,
    updateJob,
} from '../controllers/jobsController';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
// place before :id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;
