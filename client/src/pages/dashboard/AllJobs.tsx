import { FC } from 'react';
import { JobsContainer, SearchContainer } from '../../components';

type AllJobsProps = {};

const AllJobs: FC<AllJobsProps> = () => {
    return (
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    );
};

export default AllJobs;
