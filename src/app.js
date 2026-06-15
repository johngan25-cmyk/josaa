import express from 'express';
import cors from 'cors';
import User from "../models/user.js";
import createUser from "../routes/createUser.js";
import getUser from '../routes/getUser.js';
import otp from '../routes/otp.js';
import login from '../routes/login.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api',createUser);
app.use('/api',getUser);
app.use('/api',otp);
app.use('/api',login);

export default app;