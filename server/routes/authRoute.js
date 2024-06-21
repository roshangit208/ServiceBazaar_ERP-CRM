import express from 'express';
import { registerAdmin , setPassword, verifyMail , AddAdmin , getAdmins , updateAdmin , enableAdmin} from '../controllers/adminController.js';
import { addClient } from '../controllers/clientController.js';
import { addEmployee } from '../controllers/employeeController.js';
import { ownerProtected , adminProtected } from '../middleware/authMiddleware.js';
import {Login , getUser} from '../controllers/loginController.js';
const router = express.Router();

// admin register 
 router.route('/admin-register').post(registerAdmin);
 router.route('/verifymail/:token').post(verifyMail);
 router.route('/setpassword').post(setPassword);
 router.route('/add-admin').post(ownerProtected , AddAdmin);
 router.route('/get-admins').get(ownerProtected , getAdmins);
 router.route('/update-admin').post(ownerProtected , updateAdmin);
 router.route('/enable-admin/:id').post(ownerProtected , enableAdmin);

// client register 
router.route('/add-client').post(adminProtected , addClient );

// employee register 

router.route('/add-employee').post(adminProtected , addEmployee);

// login 
router.route('/login').post(Login);
router.route('/user/:token').get(getUser)

export default router;