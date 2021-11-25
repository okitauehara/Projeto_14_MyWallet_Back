import { Router } from 'express';
import * as userController from './controllers/userController.js';
import * as transactionController from './controllers/transactionController.js';
import ensureAuth from './middlewares/ensureAuth.js';

const router = Router();

router.use('/sign-out', ensureAuth);
router.use('/transactions', ensureAuth);

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.delete('/sign-out', userController.signOut);

router.get('/transactions', transactionController.getTransactions);
router.post('/transactions', transactionController.postTransaction);
router.delete('/transactions/:transactionId', transactionController.deleteTransaction);
router.put('/transactions/:transactionId', transactionController.putTransaction);

export default router;
