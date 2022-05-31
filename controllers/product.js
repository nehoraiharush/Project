import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import products from '../models/product.js'
import auth from '../auth.js'

//the function checks the given values for emptyness or double uses, if no error found adds a new product
router.post('/addProduct', auth, async (req, res) => {
    const { name, description, category, price, imageUrl, unitsInStock } = req.body
    if (name == '' || name == null)
        return res.status(201).json({
            massage: "Error: cannot create product with no name"
        })

})


export default router;