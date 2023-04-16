import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { history } from '../_helpers';

export { PrivateRoute };

function PrivateRoute({ children }) {
    const authUser = useSelector(x => x.auth.user);

    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" replace={true} />
    }

    // authorized so return child components
    return children ? children : <Outlet />;
}