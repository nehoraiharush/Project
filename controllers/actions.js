import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';


router.get('/getData', auth, async (req, res) => {

    return res.status(200).json({
        status: true,
        greeting: `Hello ${nothing}`,//need to add the proper var of the name in the database
        message: 0//suppose to add al of the data in the data base(of the products)
    })

})


export default router;