import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import jwt from 'jsonwebtoken';
import categorys from '../models/category.js'
import auth from '../auth.js'

//the function checks if the name is empty and if not adds to the database and returns the id
router.post('/addCategoty', auth, async (req, res) => {
    //if the field isnt in the body the server may callaps so we put all in the try method
    try{
        const { categoryName } = req.body
        //the field cant be empty so we return error
        if (categoryName == '') {
            return res.status(201).json({
                massage: "Error: the product name cannot be empty"
            })
        }
        //we need to check if the name is alredy existing
        const categoryExists = await categorys.findAll({where: {name: categoryName}})
        if(categoryExists.length > 0){
            console.log('the name is alredy exists')
            return res.status(201).json({
                massage:"Error: the category is alredy exists"
            })
        }
        //everything is ok we can create the category
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
    }
    //there was error in the fields
    catch{
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }

})



export default router;