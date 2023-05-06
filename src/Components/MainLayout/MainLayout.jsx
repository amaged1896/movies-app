import React from 'react';
import { Outlet } from 'react-router-dom';
import MyNavbar from './../Navbar/MyNavbar';

export default function MainLayout({ logout, userData }) {
    return (
        <>
            {/* <Navbar ></Navbar> */}
            <MyNavbar logout={logout} userData={userData} />

            <Outlet />

            {/* <Footer /> */}
        </>
    );
}
