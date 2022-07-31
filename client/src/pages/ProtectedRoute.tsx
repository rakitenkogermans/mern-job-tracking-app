import React from 'react';
import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = { children: React.ReactNode };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/landing" />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
