import express from 'express';
import { getClients , updateClient } from '../controllers/clientController.js';
import { adminProtected } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/get-clients').get(adminProtected ,  getClients);
router.route('/update-client').post(adminProtected ,  updateClient);

export default router;