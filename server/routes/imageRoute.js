import express from "express";
import userAuth from "../middlewares/auth.js";
import { generateImage } from "../controllers/imageController.js";

// Creating image router
const imageRouter = express.Router();

// Assigning the API calls
imageRouter.post("/generate-image", userAuth, generateImage);

export default imageRouter;
