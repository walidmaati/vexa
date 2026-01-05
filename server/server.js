import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRoute.js";

// Assiging the PORT
const PORT = process.env.PORT || 3001;
const app = express();

// Using the middlewares to avoid errors
app.use(express.json());
app.use(cors());

// Connecting to the database
await connectDB();

// Configuring the routes with the app.use
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Establishing the server
app.listen(PORT);
