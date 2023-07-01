import React from 'react'
import UserDashboard from '../UserDashboard';
import SideNav from './SideNav';
import { useState } from 'react';

function AdminSetting() {
    const [open, setOpen] = useState(true);

    return (
        <div className='flex w-full'>
            <SideNav open={open} setOpen={setOpen} />
            <div className='details_side'>
                <UserDashboard />
            </div>
        </div>
    )
}

export default AdminSetting