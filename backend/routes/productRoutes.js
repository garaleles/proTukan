import express from 'express';
import * as product from '../controllers/productControler.js';

const router = express.Router();

router.route('/').get(product.getAllProducts);
router.route('/:id').get(product.getProductById);

export default router;
