import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import products from '../models/product.js'
import auth from '../auth.js'

//the function checks the given values for emptyness or double uses, if no error found adds a new product
router.post('/addProduct', auth, async (req, res) => {
    //try catch to prevent accesing bad data
    try{
        const {name, description, category, price,imageUrl,unitsInStock} = req.body
        //check the name
        if(name == ''){
            return res.status(201).json({
                massage: "Erorr: name of the product cant be empty"
            })
        }
        //check the price
        if(price <= 0){
            return res.status(201).json({
                massage: "Error: the price cant be zero or negative"
            })
        }
        if(unitsInStock <= 0){
            return res.status(201).json({
                massage:"Error: cant add a zero or negivite amount of items"
            })
        }
        //checking the category by sending a request to the category unit, if the category id is legal will be response 200 if not will be respose 201
        const categoryCheckUrl = 'localhost:3000/category/findAll'
        const response = await fetch(categoryCheckUrl,{method: "GET"})
        console.log(req.body)
        if(response.status != 200){
            return res.status(201).json({
                massage: "Error: the category id is illigal"
            })
        }
        //the other fields dont need to be checked
        products.create({
            name: name,
            description: description,
            category: category,
            price: price,
            imageUrl: imageUrl,
            unitsInStock: unitsInStock
        })
        .then(product =>{
            return res.status(200).json(product)
        })
        .catch(err =>{
            return res.status(501).json({
                error: err
            })
        })
    }
    //error with the data
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})


export default router;