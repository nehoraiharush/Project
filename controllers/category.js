import express from 'express';
const router = express.Router();
import categorys from '../models/category.js'
import auth from '../auth.js'
import categorycheck from '../checkCategoryId.js'
import checkCategoryId from '../checkCategoryId.js';

//the function checks if the name is empty and if not adds to the database and returns the id
router.post('/addCategoty', auth, async (req, res) => {
    //if the field isnt in the body the server may callaps so we put all in the try method
    try {
        const { categoryName } = req.body
        //the field cant be empty so we return error
        if (categoryName == '') {
            return res.status(201).json({
                massage: "Error: the product name cannot be empty"
            })
        }
        //we need to check if the name is alredy existing
        const categoryExists = await categorys.findAll({ where: { name: categoryName } })
        if (categoryExists.length > 0) {
            console.log('the name is alredy exists')
            console.log(categoryExists)
            return res.status(201).json({
                massage: `Error: the category is alredy exists\nthe id of the category is:${categoryExists[0].id}`
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
    catch {
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }

})

//the function checks if the categoty id is existant, if yes it removes it
router.delete('/removeCategory', auth, async (req, res) => {
    //try to prevernt
    try {
        const { categoryId } = req.body
        const category = await checkCategoryId(categoryId)
        if (category) {
            console.log('find')
            category.destroy()
                //deleted succsesfuly
                .then(category => {
                    return res.status(200).json({
                        massage: 'deleted succsesfuly'
                    })
                })
                //error in the deleting
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    })
                })
        }
        //didnt find the category
        else {
            console.log('didnt find')
            return res.status(201).json({
                massage: 'Error: cant find the categoty'
            })
        }
    }
    //error in the fields
    catch {
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

//the function is returning the category by the id if it exists
router.get('/findById', async (req, res) => {
    //the try catch is to prevet the faling of the server
    try {
        const { categoryId } = req.body
        const category = await categorycheck(categoryId)
        if (category != null) {
            return res.status(200).json(category)
        }
        else {
            return res.status(201).json({
                massage: "Error: the catrgoty dont exists"
            })
        }
    }
    //error with the fields
    catch {
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

//gives all that the categorys have
router.get('/findAll', async (req, res) => {
    const category = await categorys.findAll()
    return res.status(200).json(category)
})

router.put('/updateCategory', auth, async (req, res) => {
    //try catch because there could be problem with the fields
    try {
        const { categoryId, newCategoryName } = req.body
        //the name of the category cannot be empty
        if (newCategoryName == '') {
            return res.status(201).json({
                massage: "error: the category name cant be empty"
            })
        }
        //we need to check if the name is alredy existing
        const categoryExists = await categorys.findAll({ where: { name: categoryName } })
        if (categoryExists.length > 0) {
            console.log('the name is alredy exists')
            console.log(categoryExists)
            return res.status(201).json({
                massage: `Error: the category is alredy exists\nthe id of the category is:${categoryExists[0].id}`
            })
        }
        const category = await checkCategoryId(categoryId)
        console.log(category)
        if (category.length > 0) {
            category[0].update({
                id: categoryId,
                name: newCategoryName
            })
                .then(categoty => {
                    return res.status(200).json(category)
                })
                .catch(err => {
                    error: err
                })
        }
        //no category found
        else {
            return res.status(201).json({
                massage: "Error: the category isnt found"
            })
        }
    }
    //error with the categoty
    catch {
        console.log('Error with the fields')
        return res.status(201).json({
            massage: "Error: the one field or more are broken or not existant"
        })
    }
})

export default router;