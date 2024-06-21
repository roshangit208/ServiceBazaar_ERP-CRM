
const isAuthicatedForAdmin = () => {

    const ownerToken = localStorage.getItem('ownerAccessToken');
    const adminToken = localStorage.getItem('adminAccessToken');
    const superAdminToken = localStorage.getItem('superAdminAccessToken');
    
    if (ownerToken || adminToken || superAdminToken) {
       return true;
    }
    return false;
}

const isAuthicatedForEmployee = () => {

    const ownerToken = localStorage.getItem('ownerAccessToken');
    const adminToken = localStorage.getItem('adminAccessToken');
    const superAdminToken = localStorage.getItem('superAdminAccessToken');
    const employeeToken =  localStorage.getItem('employeeAccessToken');
    
    if (ownerToken || adminToken || superAdminToken || employeeToken) {
       return true;
    }
    return false;
}

const isAuthicatedForClient = () => {

    const ownerToken = localStorage.getItem('ownerAccessToken');
    const adminToken = localStorage.getItem('adminAccessToken');
    const superAdminToken = localStorage.getItem('superAdminAccessToken');
    const employeeToken =  localStorage.getItem('employeeAccessToken');
    const clientToken =  localStorage.getItem('clientAccessToken');
    
    if (ownerToken || adminToken || superAdminToken || employeeToken || clientToken) {
       return true;
    }
    return false;
}



export { isAuthicatedForAdmin  , isAuthicatedForClient , isAuthicatedForEmployee};