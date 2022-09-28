const Product = require('../models/Product')



//add
exports.AddProduct=async(req,res)=>{
    try {
        const newProduct = new Product(req.body)
        const founded = await Product.findOne({name : req.body.name})
        if(founded){
            return res.status(400).send('PRODUCT  already exist')
        }
        await newProduct.save()
        res.status(200).send({Msg :'PRODUCT Added',newProduct})
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

// //get 

 exports.GetMyProduct = async (req, res) => {
     try {
        const product = await Product.find({ userId: req.user._id }).populate("userId")

         res.status(200).send({ msg: 'My Products List : ', posts })
     } catch (error) {
         res.status(500).send({ msg: 'Can not get my products' })

   }
 }

// // get all

exports.GetAllProducts = async (req, res) => {
     try {
         const productsList = await Product.find();
         res.status(200).send({ msg: 'Products List : ', productsList })
     } catch (error) {
         res.status(500).send({ msg: 'Can not get products' })
     }
 }

 exports.MyProducts= async (req, res) => {
    try {
        const {id} = req.params
        const productsList = await Product.find({userId : id});
        res.status(200).send({ msg: 'Products List : ', productsList })
    } catch (error) {
        res.status(500).send({ msg: 'Can not get products' })
    }
}

  //getone 
    exports.GetOneProduct = async (req, res) => {
         const {id} = req.params
         try {
             const ProductToFind = await Product.findById(id);
             res.status(200).send({ msg: 'The product: ', ProductToFind })
         } catch (error) {
             res.status(500).send({ msg: 'Can not get products' })
         }
     }

// //delete 

 exports.DeleteProduct = async (req, res) => {

     const { id } = req.params
     try {
        //  await Product.updateOne({_id:req.user._id},{$pull:{posts:id}})  
         await Product.findByIdAndDelete(id)
         res.status(200).send({ msg: 'Product deleted'});
     } catch (error) {
         res.status(500).send({ msg: "could not delete"})
     }
      }


     //update 
     exports.UpdateProduct = async (req,res)=>{
        const {id} = req.params
         try {
             const UpdateProduct= await Product.findByIdAndUpdate(id,{$set : req.body})
             res.status(200).send({ msg:'Product updated'});
         } catch (error) {
            
             res.status(500).send({msg:'could not update'})
         }
     }

