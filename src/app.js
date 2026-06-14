import express from 'express';
import cors from 'cors';
import User from "../models/user.js";
import createUser from "../routes/createUser.js";
import getUser from '../routes/getUser.js'

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api',createUser);
app.use('/api',getUser);

export default app;