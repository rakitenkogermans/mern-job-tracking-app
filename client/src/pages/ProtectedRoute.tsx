import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';

type ProtectedRouteProps = { children: React.ReactNode };

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/landing" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
