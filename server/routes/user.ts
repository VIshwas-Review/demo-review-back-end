import express from "express";

import { signIn, signUp } from "../controller/User/authController";

const router: typeof express.Router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
