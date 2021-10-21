import express from 'express';
import cors from 'cors';
import postSignUp from './controllers/signup.js';
import postSignIn from './controllers/signin.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', postSignUp);

app.post('/sign-in', postSignIn)

app.listen(4000, () => console.log('Listening on Port 4000'));