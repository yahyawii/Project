const express = require ('express')
const { SignUp, SignIn, GetAllUsers, GetOneUser, DeleteUser, UpdateUser } = require('../controllers/User')
const { isAuth } = require('../middlewares/isAuth')
const { registerValidation, Validation, logValidation } = require('../middlewares/RegisterValidator')
// const { isAuth } = require('../middlewares/isAuth')
// const { registervalidation, validation } = require('../middlewares/RegisterValidator')


const userRouter = express.Router()

userRouter.post('/SignUp',registerValidation,Validation,SignUp)
     
userRouter.post('/SignIn',logValidation,Validation,SignIn)

userRouter.get('/GetUser',isAuth,(req,res)=>{
  try {
    
    res.send(req.User)
  } catch (error) {
    res.status(500).send({msg:'could not update'})
  }
})

 userRouter.get('/AllUsers',GetAllUsers)

 userRouter.get('/OneUser/:id', GetOneUser)

 userRouter.delete('/DeleteUser/:id',DeleteUser  )

 userRouter.put('/UpdateUser/:id',UpdateUser)


module.exports= userRouter