import express from 'express';
import * as user from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, user.getAllUsers);
router.route('/:id').get(protect, admin, user.getUserById);
router.route('/auth').post(user.authUser);
router.route('/register').post(user.registerUser);
router.route('/logout').post(user.logoutUser);
router.route('/update/:id').put(protect, admin, user.updateUser);
router.route('/delete/:id').delete(protect, admin, user.deleteUser);
router.route('/profile').put(protect, user.updateUserProfile);
router.route('/profile/:id').get(protect, user.getUserProfile);

export default router;
