import categoty from './models/category.js'
import categorys from './models/category.js'

const checkCategoryId = async(id) => {
    const category = await categorys.findAll({where: {id: id}})
    if(category.length > 0){
        return category[0]
    }
    else return null
}

export default checkCategoryId