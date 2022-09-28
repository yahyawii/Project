const express = require ('express')
const { AddProduct,GetMyProduct, GetAllProducts,GetOneProduct,DeleteProduct, UpdateProduct, MyProducts } = require('../controllers/Product')
// const { isAhtu } = require('../middlewares/auth')
// const { upload } = require('../middlewares/multer')
const routerProduct = express.Router()
// const Posts = require('../models/Product')
// const User = require('../models/User')

// Add new post
routerProduct.post('/newProduct', AddProduct)

// Get all posts
routerProduct.get('/AllProduct', GetAllProducts)
routerProduct.get('/MyProducts/:id', MyProducts)


// Get my posts
// routerProduct.get('/MyProduct', GetMyProduct)


routerProduct.get('/OneProduct/:id', GetOneProduct)

// Delete one post
routerProduct.delete('/DeleteProduct/:id' , DeleteProduct)

// Update one post
routerProduct.put('/UpdateProduct/:id', UpdateProduct)



module.exports = routerProduct
