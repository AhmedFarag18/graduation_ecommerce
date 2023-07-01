import React, { useState } from 'react'
import SideNav from './AdminDashboard/SideNav'
import CardLineChart from './Admin/CardLineChart';
import HeaderStats from './Admin/Cards/HeaderStats';
import AdminNavbar from './Admin/AdminNavbar';
import CardBarChart from './Admin/CardBarChart';

function AdminDashboard() {
    const [open, setOpen] = useState(true);

    return (
        <div className='flex w-full'>
            <SideNav open={open} setOpen={setOpen} />
            <div className='details_side'>
                <div className='profile_bg'>
                    <AdminNavbar />
                    <HeaderStats />
                </div>
                <div className='container'>
                    <div className="flex flex-wrap gap-5 mb-5 -mt-16">
                        <div className='charts_col'>
                            <CardLineChart />
                        </div>
                        <div className='charts_col'>
                            <CardBarChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard