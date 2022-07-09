import mongoose from "mongoose";

import { USER_ROLES } from "../config/routes";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    confirmPassword: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    role: {
      type: String,
      default: USER_ROLES.USER,
      enum: {
        values: Object.values(USER_ROLES),
      },
    },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
