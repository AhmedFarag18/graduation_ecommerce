import jwt_decode from 'jwt-decode';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';

const Dashboard = () => {
    const [isUser, isAdmin, userData, websiteRole] = ProtectedRoute();

    if (isAdmin) {
        return (
            <div>
                <AdminDashboard />
            </div>
        );
    } else if (isUser) {
        return (
            <div>
                <UserDashboard />
            </div>
        );
    }
};
export default Dashboard;