import mockData from './mockData.json';
import dotenv from 'dotenv';
import connectDB from './db/connect';
import Job from './models/Job';

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        await Job.deleteMany();

        await Job.create(mockData);
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
