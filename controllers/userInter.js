import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import users from '../models/users.js'
import auth from '../auth.js'

//print all the 
router.get('/getData', auth, async (req, res) => {

    return res.status(200).json({
        status: true,
        greeting: `Hello ${user.fName} ${user.lName}`,
        message: 0//suppose to add all of the data in the data base(of the products)
    })

})

router.post('/verify', async (req, res) => {
    const { email, passCode } = req.body;
    const user = await users.findAll({ where: { userEmail: email } && { userPasscode: passCode } })
    if (!user) {
        return res.status(200).json({
            status: false,
            message: 'User not found'
        })
    } else {

        //need to add the line the make the user Authorize for add/delete/update categories and products
        0
    }
})

router.post('/signUp', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const email_exist = await users.findAll({ where: { userEmail: email } });
    if (email_exist) {
        return res.status(200).json({
            status: false,
            message: 'User is already exist'
        });
    }

    const passCode = Math.floor(Math.random() * 8999) + 1000;
    users.create({
        fName: firstName,
        lName: lastName,
        userEmail: email,
        userPassword: password,
        userPasscode: passCode,
    })


})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findAll({ where: { userEmail: email } && { userPassword: password } });
    if (user) {

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
    } else {
        return res.status(200).json({
            status: false,
            message: 'User is not Exist'
        });
    }
})


export default router;