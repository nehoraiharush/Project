import express from 'express';
import fetch from 'node-fetch';
import bcrypt from 'bcryptjs';
const router = express.Router();
import jwt from 'jsonwebtoken';
import users from '../models/users.js'
import auth from '../auth.js'

router.post('/signUp', async (req, res) => {
    const { fName, lName, userEmail, userPassword } = req.body;
    console.log(userEmail);
    const email_exist = await users.findAll({ where: { userEmail: userEmail } });
    if (email_exist.length > 0) {
        return res.status(201).json({
            status: false,
            message: 'User is already exist'
        });
    }

    const passCode = Math.floor(Math.random() * 8999) + 1000;
    const enPass = await bcrypt.hash(userPassword, 10)
    users.create({
        fName: fName,
        lName: lName,
        userEmail: userEmail,
        userPassword: enPass,
        userPasscode: passCode,
        isAuthorized: false
    });
    return res.status(200).json({
        message: "User added successfully"
    });

})

router.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;
    const user_find = await users.findAll({ where: { userEmail: userEmail } });
    if (user_find.length > 0) {
        const user = user_find[0];
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (isMatch) {
            const data = {
                first_Name: user.fName,
                last_name: user.lName,
                email: user.userEmail,
                passcode: user.userPasscode,
                data_password: user.password,
                userId: user.id
            };

            const token = jwt.sign(data, 'KYCLSHb37FUbQVx0mUM6lxmWS0yWUD7Z');
            return res.status(200).json({
                status: true,
                token: token
            });
        }
    } else {
        return res.status(201).json({
            status: false,
            message: 'User is not Exist'
        });
    }
})
//vierfying the user
router.put('/verify', async (req, res) => {
    const { userEmail, userPasscode } = req.body;
    //serchig for user with the above details
    const user = await users.findAll({ where: { userEmail: userEmail } && { userPasscode: userPasscode } });
    if (user.length == 0) {
        return res.status(201).json({
            status: false,
            message: 'User not found'
        });
    } else {
        user[0].isAuthorized = true;
        user[0].save();
        return res.status(200).json({
            status: true,
            message: `${user[0].fName} ${user[0].lName} is authorized`
        });
    }
})
//asking for a user email and sending a passcode
router.put('/forgetPassword', async (req, res) => {

    const email = req.body;
    const user = await users.findAll({ where: { userEmail: email } });

    if (user.length > 0) {//find a user

        user[0].isAuthorized = false;//user not authorized antmore
        user[0].passCode = Math.floor(Math.random() * 8999) + 1000;//new passcode between 1000-9999
        user[0].save();

        return res.status(200).json({
            status: true,
            message: `Passcode ${user[0].passCode}`
        });
    } else {//didn't find
        return res.status(201).json({
            status: false,
            message: "User not exist"
        })
    }

})
router.put('changePassword', async (req, res) => {
    const { entered_id, password } = req.body;

    const user = await users.findAll({ where: { id: entered_id } })
    if (user.length > 0) {
        user[0].userPassword = bcrypt.hash(password);
        user[0].save();
        return res.status(200).json({
            message: "Password updated successfully"
        });
    } else {
        return res.status(201).json({
            message: "User isn't exist"
        });
    }
})




export default router;