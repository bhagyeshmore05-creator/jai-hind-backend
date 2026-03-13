import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    district: { type: String, required: true },
    taluka: { type: String, required: true },
    password: { type: String, required: true },
    aadhar: { type: String },
    pancard: { type: String },
    profileImage: { type: String },
  },
  { timestamps: true }
);

// Check if the model already exists; if not, define it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;