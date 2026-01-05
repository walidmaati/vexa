import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registration controller function
const registerUser = async (req, res) => {
  try {
    // Getting the data from the body
    const { name, email, password } = req.body;

    // Data validation
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the initial object of the new user
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Saving the new user in the database
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login controller function
const loginUser = async (req, res) => {
  try {
    // Getting the data from the body
    const { email, password } = req.body;

    // Finding the user in the database
    const user = await userModel.findOne({ email });

    // Validation of the user exists or not
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    // Matching the password coming from the body, with the password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Token generation
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Password incorrect" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Controller to get the credits of the current logged in user
const userCredits = async (req, res) => {
  try {
    // Getting the User ID from body, that are coming from the middleware
    const { userId } = req.body;

    // Finding the user
    const user = await userModel.findById(userId);

    // Returning the current balance of credits
    res.json({
      success: true,
      credits: user.credit,
      user: { name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Exporting all controllers
export { registerUser, loginUser, userCredits };
