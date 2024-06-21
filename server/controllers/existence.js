import Admin from "../models/Admin.js"
const existence =  async (email) => {
  
    const admin =  await Admin.findOne({email});

    if(admin)
     {
        return false;
     } 

     return true;
}

export default existence;