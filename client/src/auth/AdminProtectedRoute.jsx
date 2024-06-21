import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthicatedForAdmin , isAuthicatedForClient, isAuthicatedForEmployee } from "./AuthController";

const AdminProtected = ({children}) => {
    console.log(isAuthicatedForAdmin);
   return isAuthicatedForAdmin() ? <> {children} </> : <Navigate to="/login" />;
}

const EmployeeProtected = ({children}) => {

   return isAuthicatedForEmployee() ? <> {children} </> : <Navigate to="/login" />;
}

const ClientProtected = ({children}) => {

    return isAuthicatedForClient() ? <> {children} </> : <Navigate to="/login" />;
 }

export { AdminProtected , EmployeeProtected ,  ClientProtected };