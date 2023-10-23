
import { Router } from "express";
import { login, register, verifyOTP } from "../controllers/authController.js";

const router = Router();

// register
router.route('/register')
    .post(register)

// login
router.route('/login')
    .post(login)

// verify OTP
router.route('/verify')
    .post(verifyOTP)


export default router;