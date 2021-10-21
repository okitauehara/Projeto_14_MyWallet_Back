import express from 'express';
import cors from 'cors';
import { postSignUp } from './controllers/signup.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);

app.listen(4000, () => console.log('Listening on Port 4000'));