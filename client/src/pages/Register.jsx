import React, { useEffect } from 'react';
// /import ClientCompanyTabs from '../components/ClientCompanyTab';
import CompanySignUp from '../components/CompanySignUp';
import { CheckLoggedIn } from '../auth/CheckLoggedIn';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(CheckLoggedIn());
    }, []);

    return (
        <>
            
            <CompanySignUp />
            
        </>
    );
}

export default Register;
