import React from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

type AddJobProps = {};

const AddJob: React.FC<AddJobProps> = ({}) => {
    const {
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        handleChange,
        clearValues,
        isLoading,
        createJob,
        editJob,
    } = useAppContext();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }
        if (isEditing) {
            await editJob();
            return;
        }
        await createJob();
        console.log('create job');
    };

    const handleJobInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange(name, value);
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
                    <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
                    <FormRow type="text" labeltText="job location" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
                    <FormRowSelect name="status" value={status} handleChange={handleJobInput} list={Object.values(statusOptions)} />
                    <FormRowSelect
                        labelText="job type"
                        name="jobType"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={Object.values(jobTypeOptions)}
                    />
                    <div className="btn-container">
                        <button className="btn btn-block submit-btn" type="submit" onClick={handleSubmit} disabled={isLoading}>
                            submit
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            type="button"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                clearValues();
                            }}
                            disabled={isLoading}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
