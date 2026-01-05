import mongoose from "mongoose";

// Creating the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credit: { type: Number, default: 5 },
  },
  // Titling the collection where this schema will be stored
  {
    collection: "users",
  }
);
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
