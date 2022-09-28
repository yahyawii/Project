const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name : String,
        email : {type : String, required : true, unique : true},
        password : {type : String, required : true},
        role : String,
        pic:String,
        phone : String,
        adresse : String
    }
)


module.exports = mongoose.model('UserAssad',userSchema)