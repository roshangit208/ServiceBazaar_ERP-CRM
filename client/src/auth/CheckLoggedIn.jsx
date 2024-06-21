

 export const CheckLoggedIn = () => {
    const ownerToken = localStorage.getItem('ownerAccessToken');
    const adminToken = localStorage.getItem('adminAccessToken');
    const superAdminToken = localStorage.getItem('superAdminAccessToken');
    const employeeToken = localStorage.getItem('employeeAccessToken');
    const clientToken = localStorage.getItem('clinetAccessToken');
    if(ownerToken || adminToken || superAdminToken)
      {
        return "/dashboard";
      }

   if(employeeToken || clientToken)   
    {
      return "/profile"
    }
     
}