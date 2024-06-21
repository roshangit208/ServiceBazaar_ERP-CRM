import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Layout = ({children}) => {
    console.log("childeren",children);
    return (
        <>
        
        <Sidebar/>
         <div className=' ml-[20%]'>
           <Topbar/>
          <div className='p-6 bg-white h-[fit-screen]'>
          {children}
          </div>
         </div>
        
        </>
    );
}

export default Layout;
