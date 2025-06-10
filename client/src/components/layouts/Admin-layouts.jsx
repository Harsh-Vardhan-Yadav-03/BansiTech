import React from 'react'
import './AdminLayout.css';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

function AdminLayout() {

    const { user, isLoading } = useAuth();
    console.log("admin layout", user);

    // this isloading helps in to allow only admin to admin page not to any user , if any user other than admin try to go on admin page it will direct them to home page.
    if(isLoading){
        return <h1>Loading...</h1>;
    }

    if(!user.isAdmin){
        return <Navigate to="/"/>;
    }
    return (
        <>
            <header className='admin-header'>
                <div className="admin-container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users"> <FaUser /> Users </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts"> <FaMessage /> Contacts </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/services"> <FaRegListAlt/> Services </NavLink>
                            </li>
                            <li>
                                <NavLink to="/"><FaHome /> Home </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        <Outlet />
        </>
    )
}

export default AdminLayout;