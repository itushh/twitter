import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.status(200).json({ timestamp: new Date(), status: "OK", health: "Good", mode: process.env.NODE_ENV || "development" });
});

app.listen(PORT, () => {
    if (process.env.NODE_ENV === "production") {
        console.log(`Running production server on port : ${PORT}`);
    } else {
        console.log(`Running development server at http://localhost:${PORT}`);
    }
});