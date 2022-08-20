import { FC } from 'react';
import { JobType } from '../types/types';
import { useAppContext } from '../context/appContext';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Link } from 'react-router-dom';

type JobProps = {} & JobType;

const Job: FC<JobProps> = ({
    _id,
    jobType,
    jobLocation,
    createdAt,
    createdBy,
    position,
    status,
    updatedAt,
    company,
}) => {
    const { setEditJob, deleteJob } = useAppContext();
    const date = new Date(createdAt).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className="actions">
                        <Link
                            to="/add-job"
                            className="btn edit-btn"
                            onClick={setEditJob.bind(null, _id)}
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="btn delete-btn"
                            onClick={deleteJob.bind(null, _id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;
