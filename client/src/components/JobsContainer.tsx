import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

type JobsContainerProps = {};

const JobsContainer: React.FC<JobsContainerProps> = ({}) => {
    const stopRunningUseEffectTwice = useRef(false);
    const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

    useEffect(() => {
        if (!stopRunningUseEffectTwice.current) {
            console.log('ho');
            getJobs().then();

            return () => {
                stopRunningUseEffectTwice.current = true;
            };
        }
    }, []);

    if (isLoading) {
        return <Loading center={true} />;
    }

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
        </Wrapper>
    );
};

export default JobsContainer;
