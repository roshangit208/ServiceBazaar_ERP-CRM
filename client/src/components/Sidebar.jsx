import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HeadsetIcon from '@mui/icons-material/Headset';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = () => {
      const [open , setOpen] = useState(false);
       const navigate = useNavigate();
       const {userInfo} = useSelector((state)=>(state.user));
       const handleLogOut = () => {
           localStorage.removeItem('ownerAccessToken');
           localStorage.removeItem('adminAccessToken');
           localStorage.removeItem('superAdminAccessToken');
           localStorage.removeItem('clientAccessToken');
           localStorage.removeItem('employeeAccessToken');
           navigate('/login');
       }
    return (
        <>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl shadow-black" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a  class="flex items-start p-2 pl-0 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <img style={{ width: "200px", height: "50px", objectFit:"cover"}} src="./assets/sblogo.png" alt="companylogo" srcset="" />
                            </a>
                        </li>
                       { ( userInfo?.role === "owner" || userInfo?.role === "super-admin") &&  <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>{navigate('/dashboard')}}>
                               <DashboardIcon/>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>}
                      { ( userInfo?.role !== "client" && userInfo?.role !== "employee") && <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"onClick={()=>{navigate('/client')}}>
                                <HeadsetIcon/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Clients</span>
                                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li>}
                        <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>{navigate('/order')}}>
                               <BookmarkBorderIcon/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Orders</span>
                                <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                      {( userInfo?.role !== "client" && userInfo?.role !== "employee") &&  <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"onClick={()=>{navigate('/employee')}}>
                                <BadgeIcon/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Employee</span>
                            </a>
                        </li>}
                      { userInfo?.role !== "client" && <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>{navigate('/service')}} >
                                <HomeRepairServiceIcon/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Services</span>
                            </a>
                        </li>}
                        <li>
                            <a  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                               <PictureAsPdfIcon/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Invoice</span>
                            </a>
                        </li>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick={()=>{setOpen(!open);}}>
                                <SettingsIcon/>
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Setting</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" class=" py-2 space-y-2" style={open ? { display :"block"} : { display : "none"}}>
                                <li>
                                    <a  class="flex items-center gap-3 w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" onClick={()=>{ setOpen(false); navigate('/profile')}} > <AccountCircleIcon/>  Profile</a>
                                </li>
                                { userInfo?.role === "owner" && <li>
                                    <a  class="flex items-center gap-3 w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"  onClick={()=>{ setOpen(false); navigate('/admin-setting')}} > <AdminPanelSettingsIcon/>   Admin</a>
                                </li>}
                                <li>
                                    <a  class="flex items-center gap-3 w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"  onClick={()=>{ setOpen(false); handleLogOut();}}> <LogoutIcon/> Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    );
}

export default Sidebar;
