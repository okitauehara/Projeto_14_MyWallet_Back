import express from 'express';
import cors from 'cors';
import postSignUp from './controllers/signup.js';
import postSignIn from './controllers/signin.js';
import deleteToken from './controllers/signout.js';
import {
  deleteTransaction, getTransactions, postTransaction, putTransaction,
} from './controllers/transactions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);
app.post('/sign-in', postSignIn);
app.delete('/sign-out', deleteToken);

app.get('/transactions', getTransactions);
app.post('/transactions', postTransaction);
app.delete('/transactions/:transactionId', deleteTransaction);
app.put('/transactions/:transactionId', putTransaction);

export default app;
