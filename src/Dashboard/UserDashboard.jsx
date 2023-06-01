import React, { useState } from 'react'
import AdminNavbar from './Admin/AdminNavbar';

function UserDashboard() {
    // const [open, setOpen] = useState(true);

    return (
        <div className='bg-main-color'>
            <div className={`py-7 max-sm:p-2 bg-gray-50 relative w-full`}>
                <div className='bg-slate-100'>
                    <AdminNavbar />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard