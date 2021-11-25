import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import {
  deleteTransaction, getTransactions, postTransaction, putTransaction,
} from './controllers/transactions.js';
import ensureAuth from './middlewares/ensureAuth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);
app.delete('/sign-out', ensureAuth, userController.signOut);

app.get('/transactions', getTransactions);
app.post('/transactions', postTransaction);
app.delete('/transactions/:transactionId', deleteTransaction);
app.put('/transactions/:transactionId', putTransaction);

export default app;
