
import { Router } from "express";
import { getUserById, login, register, verifyOTP } from "../controllers/authController.js";

const router = Router();


// get user
router.route('/user/:id')
    .get(getUserById)

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