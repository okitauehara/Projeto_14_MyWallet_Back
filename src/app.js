import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import deleteToken from './controllers/signout.js';
import {
  deleteTransaction, getTransactions, postTransaction, putTransaction,
} from './controllers/transactions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', userController.signUp);
app.post('/sign-in', userController.signIn);
app.delete('/sign-out', deleteToken);

app.get('/transactions', getTransactions);
app.post('/transactions', postTransaction);
app.delete('/transactions/:transactionId', deleteTransaction);
app.put('/transactions/:transactionId', putTransaction);

export default app;
