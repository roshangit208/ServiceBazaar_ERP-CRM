import express from 'express';
import { getEmployee , updateEmployee } from '../controllers/employeeController.js';
import { adminProtected } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/get-employees').get(adminProtected ,  getEmployee);
router.route('/update-employee').post(adminProtected , updateEmployee);

export default router;