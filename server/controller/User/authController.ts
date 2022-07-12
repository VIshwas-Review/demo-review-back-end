import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

import User from "../../models/user";

config();

const secret = process.env.JWT_SECRET as string;

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Create account before signin" });

    const isValidPassword = await validatePassword(
      password,
      existingUser.password
    );

    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credential" });

    const accessToken = jwt.sign(
      {
        email: existingUser.email,
        userId: existingUser._id,
        role: existingUser.role,
      },
      secret as string,
      { expiresIn: "1d" }
    );

    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id,
      {
        accessToken: accessToken,
      },
      { new: true }
    );
    res.status(200).json({
      data: { user: { ...updatedUser._doc } },
      message: "Welcome back",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const {
    email,
    password,
    confirmPassword,
    imageUrl,
    firstName,
    lastName,
    role,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists, please Login" });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Confirm Password is not matching with password" });

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role,
      imageUrl,
      name: `${firstName} ${lastName}`,
    });
    const accessToken = await jwt.sign(
      {
        email: newUser.email,
        userId: newUser._id,
        role: newUser.role,
      },
      secret,
      { expiresIn: "1d" }
    );
    newUser.accessToken = accessToken;
    await newUser.save();

    res.status(200).json({
      data: { user: { ...newUser._doc } },
      message: "Successfully created an account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
