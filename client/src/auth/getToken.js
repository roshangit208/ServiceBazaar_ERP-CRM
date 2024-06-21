export const getToken = () => {
    const ownerToken = localStorage.getItem('ownerAccessToken');
    const adminToken = localStorage.getItem('adminAccessToken');
    const superAdminToken = localStorage.getItem('superAdminAccessToken');
    const clientToken = localStorage.getItem('clientAccessToken');
    const employeeToken = localStorage.getItem('employeeAccessToken');
   if(ownerToken) return ownerToken;
   if(adminToken) return adminToken;
   if(superAdminToken) return superAdminToken;
   if(clientToken) return clientToken;
   if(employeeToken) return employeeToken;
}