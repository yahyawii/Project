const mongoose = require('mongoose')

const Product = new mongoose.Schema({
      name : String,
      description : String,
      availability : String,
      userId:String,
      userName:String,
      pic : String
}) 
module.exports = mongoose.model('Product',Product)
