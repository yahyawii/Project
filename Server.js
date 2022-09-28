const express = require('express')
const userRouter = require('./Routes/User')
const ConnectDB = require('./config/connectDB')
const routerProduct = require('./Routes/Product')
const app = express()
const path= require('path')

require('dotenv').config()

ConnectDB()


app.use(express.json())


app.use('/api/auth',userRouter)


app.use('/api/PRODUCT',routerProduct)


//setup for deployment
app.use(express.static(path.join(__dirname,'client','build')))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})


app.listen(process.env.port,console.log(`Server is running on the port ${process.env.port}`))
