import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

const Register = () => {
    const [values, setvalues] = useState(initialState);
    const navigate = useNavigate();
    const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [navigate, user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setvalues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        const currentUser = { name, email, password };
        if (isMember) {
            await setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login successful! Redirecting...',
            });
        } else {
            await setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User created! Redirecting...',
            });
        }
    };

    const toggleMember = () => {
        setvalues({ ...values, isMember: !values.isMember });
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type="button" onClick={toggleMember} className="member-btn">
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
