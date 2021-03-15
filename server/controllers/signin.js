const User = require('../models/auth.models')
const jwt = require('jsonwebtoken')
exports.signin = (req,res)=>{
    const {email,password} = req.body
    User.findOne({email,password},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'email ou mot de passe incorrecte'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_JWT,{expiresIn:'7d'});
        const {_id,name,email,role} = user
        res.json({
            token,
            user:{_id,name,email,role}
        })
    })
}