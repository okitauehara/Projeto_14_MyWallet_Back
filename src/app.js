import express from 'express';
import cors from 'cors';
import postSignUp from './controllers/signup.js';
import postSignIn from './controllers/signin.js';
import { getTransactions, postTransaction } from './controllers/transactions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);

app.post('/sign-in', postSignIn);

app.get('/transactions', getTransactions);

app.post('/transactions', postTransaction);

app.listen(4000, () => console.log('Listening on Port 4000'));