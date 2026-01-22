import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";

// Registration controller function
const registerUser = async (req, res) => {
  try {
    // Getting the data from the body
    const { name, email, password } = req.body;

    // Data validation
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be more than 8 characters",
      });
    }
    if (name.length < 2) {
      return res.json({
        success: false,
        message: "Full name cannot be less than 2 characters",
      });
    }
    if (name.length > 20) {
      return res.json({
        success: false,
        message: "Full name cannot be more than 20 character",
      });
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      return res.json({
        success: false,
        message: "Email form invalid, try to use Gmail",
      });
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
      credit: user.credit,
      user: { name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 1000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan not exist" });
    }
    date = Date.now();
    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt,
      );
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment failed" });
      }
      const userData = await userModel.findById(transactionData.userId);
      const credit = userData.credit + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { credit });
      await transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });
      res.json({ success: true, message: "Credits added successfully" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Exporting all controllers
export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
