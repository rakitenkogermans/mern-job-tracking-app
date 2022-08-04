import React, { ReactNode } from 'react';
import Wrapper from '../assets/wrappers/JobInfo';

type JobInfoProps = { icon: ReactNode; text: string };

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
    return (
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
        </Wrapper>
    );
};

export default JobInfo;
