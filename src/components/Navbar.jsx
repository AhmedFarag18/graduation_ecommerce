import React from 'react'
import MainNav from './MainNav';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

function Navbar() {
    return (
        <>
            <nav className="bg-white w-full z-20 top-0 left-0 border-neutral-100 border">
                <TopNav />
                <MainNav />
                <BottomNav />
            </nav>
        </>
    )
}

export default Navbar