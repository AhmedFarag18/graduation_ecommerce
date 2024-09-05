import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ auth, children }) {
    if (auth === false) {
        return <Navigate to="/error" replace={true} />;
    } else {
        return children ? children : <Outlet />;
    }
}

export default PrivateRoute;