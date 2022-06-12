import mongoose from "mongoose";

const ROLE: { ADMINE: string; USER: string; OWNER: string } = {
  ADMINE: "admin",
  USER: "user",
  OWNER: "owner",
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  confirmPassword: { type: String, required: true, trim: true },
  imageUrl: { type: String, trim: true },
  role: {
    type: String,
    default: ROLE.USER,
    enum: {
      values: Object.values(ROLE),
    },
  },
  accessToken: { type: String },
},
  { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
