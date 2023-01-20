import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { Loading } from '../components';
import styled from 'styled-components';

const FullHeight = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type ProtectedRouteProps = { children: React.ReactNode };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { user, userLoading } = useAppContext();

    if (userLoading)
        return (
            <FullHeight>
                <Loading center={false} />
            </FullHeight>
        );

    if (!user) {
        return <Navigate to="/landing" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
