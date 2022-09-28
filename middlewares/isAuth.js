const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.isAuth=async(req,res,next)=>{
    try {
        const token = req.header('Authorization')
        var decoded = jwt.verify(token,process.env.privateKey);
        if (!decoded){return res.status(400).send({errors : [{msg: 'not authorized token'}]})}
        const userFounded = await User.findById(decoded.id)
        req.User= userFounded
        next()
        
    } catch (error) {
        res.status(500).send({errors: [{msg:'not authorized'}]})
        
    }
}