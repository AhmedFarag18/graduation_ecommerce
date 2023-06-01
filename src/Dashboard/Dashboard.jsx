import jwt_decode from 'jwt-decode';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const token = JSON.parse(localStorage.getItem('user')).token; // Retrieve JWT token from local storage
    const decodedToken = jwt_decode(token, { complete: true });

    // Get the admin role claim value
    const adminRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (adminRole === 'admin') {
        return (
            <div>
                <AdminDashboard />
            </div>
        );
    } else {
        return (
            <div>
                <UserDashboard />
            </div>
        );
    }
};
export default Dashboard;