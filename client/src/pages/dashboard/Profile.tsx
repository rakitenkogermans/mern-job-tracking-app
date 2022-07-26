import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !lastName || !location) {
            displayAlert();
            return;
        }
        await updateUser({ name, email, lastName, location });
    };
    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="name"
                        value={name || ''}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <FormRow
                        type="text"
                        labeltText="last name"
                        name="lastName"
                        value={lastName || ''}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setLastName(e.target.value)
                        }
                    />
                    <FormRow
                        type="email"
                        name="email"
                        value={email || ''}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <FormRow
                        type="text"
                        name="location"
                        value={location || ''}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setLocation(e.target.value)
                        }
                    />
                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading ? 'please wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;
