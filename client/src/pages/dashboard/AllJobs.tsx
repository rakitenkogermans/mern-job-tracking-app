import React from 'react';
import { JobsContainer, SearchContainer } from '../../components';

type AllJobsProps = {};

const AllJobs: React.FC<AllJobsProps> = ({}) => {
    return (
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    );
};

export default AllJobs;
