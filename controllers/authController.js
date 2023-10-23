import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generate } from 'otp-generator';
import nodemailer from 'nodemailer';


// Get, get user by id 
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id).lean().exec();

    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    let { name, ...args } = user;

    res.status(200).json({ user: name });
})

// POST, verify OTP 
export const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(400).json({ message: "User doesn't exists" })
    }

    if (otp != user.otp) {
        return res.status(400).json({ message: "Wrong Otp" })
    }

    user.otp = "";
    if (!user?.isAccountVerified) {
        user.isAccountVerified = true;
    }

    await user.save();

    res.status(200).json({ message: "User Authenticated Successfully", user });
})

// POST, register 
export const register = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // check duplicate 
    const user = await User.findOne({ email }).lean().exec();
    if (user) {
        return res.status(409).json({ message: "User already exists" })
    }

    const newUser = await User.create({ name, email });

    // send otp 
    const otp = await generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    newUser.otp = otp;
    await newUser.save();
    try {

        const mailTransporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })

        let mailDetails = {
            from: process.env.USER_MAIL,
            to: email,
            subject: 'Test mail',
            text: `Please verify your account using the OTP: ${otp}.`
        };

        await mailTransporter.sendMail(mailDetails, (err) => {
            if (err) {
                console.log(err, "error occured")
                res.status(400).json({ error: err })
            } else {
                console.log('Mail Sent');
                res.status(200).json({ message: "Mail Sent" })
            }
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e })
    }

})


// Post Login 
export const login = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(400).json({ message: "User doesn't exists" })
    }

    // send otp 
    const otp = await generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    user.otp = otp;
    await user.save();

    try {

        const mailTransporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })

        let mailDetails = {
            from: process.env.USER_MAIL,
            to: email,
            subject: 'Test mail',
            text: `Please verify your account using the OTP: ${otp}.`
        };

        await mailTransporter.sendMail(mailDetails, (err) => {
            if (err) {
                console.log(err, "error occured")
                res.status(400).json({ error: err })
            } else {
                console.log('Mail Sent');
                res.status(200).json({ message: "Mail Sent" })
            }
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e })
    }
})


