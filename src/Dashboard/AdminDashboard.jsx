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
            <div className={` ${open ? "w-1/5" : "w-20 "} bg-main-color h-screen p-5  pt-8 relative duration-300`}>
                <SideNav open={open} setOpen={setOpen} />
            </div>
            <div className={`py-7 max-sm:p-2 bg-gray-50 relative ${open ? "w-4/5" : "w-full"}`}>
                <div className='bg-slate-100'>
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