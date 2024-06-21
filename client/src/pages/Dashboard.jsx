import React from 'react';
import Layout from '../layout/Layout';
import { useNavigate } from 'react-router-dom';
import BarsDataset from '../components/Chart';
import Stats from '../components/Stats';


const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Layout>
               <div className='w-[100%]  flex flex-col justify-center items-center '> 
               <BarsDataset/>
                <Stats/>
                </div> 
            </Layout>
        </>
    );
}

export default Dashboard;
