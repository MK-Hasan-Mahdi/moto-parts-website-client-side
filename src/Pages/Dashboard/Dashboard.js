import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='container mx-auto'>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <h2 className='text-2xl text-yellow-500 font-bold text-center'>Dashboard</h2>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label for="dashboard-sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard'>My Profile</Link></li>
                        <li><Link to='/dashboard/addreview'>Add Review</Link></li>
                        <li><Link to='/dashboard/myorder'>My Orders</Link></li>
                        {/* {admin &&
                        <>
                            <li><Link to='/dashboard/users'>All Users</Link></li>
                            <li><Link to='/dashboard/addDoctor'>Add Doctor</Link></li>
                            <li><Link to='/dashboard/manageDoctor'>Manage Doctor</Link></li>
                        </>
                    } */}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;