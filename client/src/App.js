
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import EmailVerficationPage from './pages/EmailVerficationPage';
import Dashboard from './pages/Dashboard';
import AdminSetting from './pages/AdminSetting';
import ProfilePage from './pages/ProfilePage';
import ClientPage from './pages/ClientPage';
import EmployeePage from './pages/EmployeePage';
import ServicePage from './pages/ServicePage';
import OrderPage from './pages/OrderPage';
import { BrowserRouter , Routes, Route , useRoutes} from 'react-router-dom';
import { AdminProtected , EmployeeProtected , ClientProtected } from './auth/AdminProtectedRoute';
import {  useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userSlice';
import { useEffect } from 'react';
import { getToken } from './auth/getToken';

const RouteApp = () => {
  let routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login/> },
    { path: "/register", element: <Register/> } ,
    { path: "/verifymail/:token", element: <EmailVerficationPage/> } ,
    { path: "/dashboard", element: <AdminProtected><Dashboard/></AdminProtected> } ,
    { path: "/admin-setting", element: <AdminProtected><AdminSetting/></AdminProtected>} ,
    { path: "/profile", element: <ClientProtected> <ProfilePage/> </ClientProtected> } ,
    { path: "/client", element: <AdminProtected><ClientPage/></AdminProtected>} ,
    { path: "/employee", element: <AdminProtected><EmployeePage/></AdminProtected>} ,
    { path: "/service", element: <EmployeeProtected><ServicePage/></EmployeeProtected> } ,
    { path: "/order", element: <ClientProtected><OrderPage/></ClientProtected> } ,
  ]);
  return routes;
};



function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
   const token = getToken();
   console.log(token);
   dispatch(fetchUser(token));
  },[]);
  return (
    <>
      <BrowserRouter>
      <RouteApp/>
      </BrowserRouter>
    </>

  );
}

export default App;
