import { FC } from 'react';

type FormRowProps = {
    type: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    labeltText?: string;
};

const FormRow: FC<FormRowProps> = ({ type, name, value, handleChange, labeltText }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labeltText || name}
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                className="form-input"
            />
        </div>
    );
};

export default FormRow;
