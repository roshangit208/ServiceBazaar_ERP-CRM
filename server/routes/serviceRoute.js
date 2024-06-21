import express from 'express';
import { addService , getServices , updateService } from '../controllers/serviceController.js';
import { employeeProtected } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/add-service').post(employeeProtected,addService)
router.route('/get-services').get(employeeProtected ,  getServices);
router.route('/update-service').post(employeeProtected , updateService);

export default router;