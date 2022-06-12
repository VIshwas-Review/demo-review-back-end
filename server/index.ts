import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userAuthentication from "./middleware/authentication";
import { auth } from "./middleware/auth";
import airlineRoutes from "./routes/airline";
import userRoutes from "./routes/user";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  userAuthentication(
    [
      { url: "/user/signin" },
      { url: "/user/signup" },
      { url: "/airlines", methods: ["GET"] },
    ],
    auth
  )
);
app.use("/airlines", airlineRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL as string)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
