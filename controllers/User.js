const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')
const User = require('../models/User')




exports.SignUp =async(req,res)=>{
    try {
        console.log("aaa")
        const{name,email,password }=req.body
        
        const found = await User.findOne({email})

        if(found){return res.status(400).send({errors : [{msg: 'Email already exist'}]}) }

        const newUser = new User(req.body)
        const salt=10

        const hashedPassword= bcrypt.hashSync(password,salt);

        newUser.password = hashedPassword

        const payload={id:newUser._id}

        var token = jwt.sign( payload, process.env.privatekey);

        await newUser.save()
        res.status(200).send({msg:'User registred with success',newUser,token})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'could not register'}]})
        
    }
}

exports.SignIn= async(req,res)=>{
    try {
        const {email,password}=req.body

        const found = await User.findOne({email})

        if (!found){return res.status (400).send({errors:[{msg:'wrong email'}]}) }

        const match = await bcrypt.compare(password,found.password);

        if (!match){return res.status(400).send ({errors : [{msg : 'wrong password'}]})}

        const payload = {id : found._id}

        var token = jwt.sign(payload,process.env.privatekey)

        res.status(200).send({msg : 'SignIn',found,token })


    } catch (error) {
        res.status(500).send({error:[{msg:'could not logged in'}]})
        
    }



}



exports.GetAllUsers= async (req, res) => {
    try {
        const usersList = await User.find();
        res.status(200).send({ msg: 'User List : ', usersList })
    } catch (error) {
        res.status(500).send({ msg: 'Can not get Users' })
    }
}


exports.GetOneUser = async (req, res) => {
    const {id} = req.params
    try {
        const UserToFind = await User.findById(id);
        res.status(200).send({ msg: 'The user: ', UserToFind })
    } catch (error) {
        res.status(500).send({ msg: 'Can not get Users' })
    }
}

exports.DeleteUser = async (req, res) => {

    const { id } = req.params
    try {
       //  await Product.updateOne({_id:req.user._id},{$pull:{posts:id}})  
        await User.findByIdAndDelete(id)
        res.status(200).send({ msg: 'User deleted'});
    } catch (error) {
        res.status(500).send({ msg: "could not delete"})
    }
     }

     exports.UpdateUser = async (req,res)=>{
        const {id} = req.params
         try {
             const Updateuser= await User.findByIdAndUpdate(id,req.body,{new:true})
             res.status(200).send({ msg:'User updated',Updateuser});
         } catch (error) {
             res.status(500).send({msg:'could not update'})
         }
     }