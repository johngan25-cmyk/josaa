import express from 'express';
import cors from 'cors';
import User from "../models/user.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "JoSAA Backend Running"
    });
});


app.get("/test-db", async (req, res) => {
    try {
        const db = getDB();

        await db.command({ ping: 1 });

        res.json({
            success: true,
            message: "MongoDB Connected"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/create-user", async (req, res) => {
  try {
    const result = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
export default app;