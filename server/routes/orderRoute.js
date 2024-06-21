import express from 'express';
import { addOrder , getOrders , updateOrder , changeStatus ,paymentStatus , getDashData , getMonthlyStats} from '../controllers/orderController.js';
import { adminProtected, clientProtected, employeeProtected } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/add-order').post(clientProtected,addOrder)
router.route('/get-orders').get(clientProtected,  getOrders);
router.route('/update-order').post(clientProtected, updateOrder);
router.route('/order-status').post(employeeProtected, changeStatus);
router.route('/payment-status').post(adminProtected, paymentStatus);
router.route('/dashboard-data').get(adminProtected,getDashData);
router.route('/monthly-stats').get(adminProtected,getMonthlyStats);

export default router;