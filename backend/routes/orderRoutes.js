import express from 'express';
import * as order from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, order.addOrderItems);
router.route('/myorders').get(protect, order.getMyOrders);
router.route('/:id').get(protect, order.getOrderById);
router.route('/:id/pay').put(protect, order.updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, order.updateOrderToDelivered);
router.route('/').get(protect, admin, order.getOrders);

export default router;
