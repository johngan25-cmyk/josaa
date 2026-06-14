import express from 'express';
import cors from 'cors';
import User from "../models/user.js";
import createUser from "../routes/createUser.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/create-user',createUser);

export default app;