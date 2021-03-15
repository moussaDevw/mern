const User = require('../models/auth.models')
const expressJwt = require('express-jwt')

exports.requireSignin = expressJwt({
    secret: process.env.SECRET_JWT, // req.user._id
    algorithms: ['HS256']
});

exports.adminMiddleware = (req,res,next)=>{
    User.findById({ _id: req.user._id }).exec((err,user)=>{
        if(err || !user){
            console.log(err)
            return res.status(400).json({
                error:'Ce utilisateur n existe pas'
            })
        }
        if(user.role !== 'admin'){
            return res.status(400).json({
                error:'Ressource d administration. Accès refusé.'
            })
        }
        req.profile = user
        next()
    })
}