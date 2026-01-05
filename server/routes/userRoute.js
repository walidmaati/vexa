import express from "express";
import userAuth from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  userCredits,
} from "../controllers/userController.js";

// Creating the user router
const userRouter = express.Router();

// Assigning the API calls
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", userAuth, userCredits);
export default userRouter;
