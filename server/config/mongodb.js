import mongoose from "mongoose";

// Connection to MongoDB configuration
const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/vexa`);
};
export default connectDB;
