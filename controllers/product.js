import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import products from '../models/product.js'
import auth from '../auth.js'
import checkCategoryId from '../checkCategoryId.js';

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
        const categoryExists = checkCategoryId(category)
        if(!categoryExists){
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

//the function removes item by the given id
router.delete('/remove', auth,async(req,res) =>{
    //try catch to prevent accesing bad data
    try{
        const {id} = req.body
        const item = await products.findAll({where: {id: id}})
        if(item.length > 0){
            item[0].destroy()
            .then(() => {
                return res.status(200).json({
                    massage: "Item removed succsesfuly"
                })
            })
            .catch(err => {
                return res.status(201).json({
                    error: err
                })
            })
        }
        //the item wasnt found
        else{
            return res.status(201).json({
                massage: "Error: cant find the product"
            })
        }
    }
    //error with the field
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

router.put('/update',auth,async(req,res) => {
    //try catch to prevent failing if there is problem with the fields
    try{
        const {name, id, description, category, price, imageUrl, unitsInStock} = req.body
        const item = await products.findAll({where: {id: id}})
        console.log(item)
        console.log(id)
        if(item.length > 0){
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
            item[0].update({
                name: name,
                description: description,
                category: category,
                price: price,
                imageUrl: imageUrl,
                unitsInStock: unitsInStock
            })
            .then(result =>{
                return res.status(200).json(result)
            })
            //error with the updating
            .catch(err => {
                return res.status(201).json({
                    error: err
                })
            })
        }
        //the item wanst found
        else{
            return res.status(201).json({
                massage: "Error: the item wasnt found"
            })
        }
    }
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

router.get('/findById',async(req,res) => {
    try{
        const {id} = req.body
        const item = await products.findAll({where: {id:id}})
        if(item.length > 0){
            return res.status(200).json(item[0])
        }
        //didnt find
        else{
            return res.status(201).json({
                massage: "Error, cant find the item"
            })
        }
    }
    //there was problem with the field
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

router.get('/findAll', async(req,res)=>{
    try{
        const items = await products.findAll()
        return res.status(200).json(items)
    }
    //some error
    catch{
        return res.status(201).json({
            massage:"Unknown error"
        })
    }
})

router.get('/findByCategory', async(req,res)=>{
    try{
        const {categoryId} = req.body
        const items = await products.findAll({where: {category:categoryId}})
        return res.status(200).json(items)
    }
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

export default router;