import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import categorys from '../models/category.js'
import auth from '../auth.js'

//the function checks if the name is empty and if not adds to the database and returns the id
router.post('/addCategoty', auth, async (req, res) => {
    const { categoryName } = req.body
    if (categoryName == '') {
        return res.status(201).json({
            massage: "Error: the product name cannot be empty"
        })
    }
    categorys.create({
        name: categoryName
    })
        .then(category => {
            return res.status(200).json({
                id: category.id
            })
        })
        .catch(() => {
            return res.status(201).json({
                massage: "Unknown error"
            })
        })
})



export default router;