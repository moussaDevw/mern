const jwt = require('jsonwebtoken')
const User = require('../models/auth.models')
exports.activateAccount = (req,res)=>{
    const {token} = req.body
    if(token){
        jwt.verify(token,process.env.SECRET_ACTIVATE_ACCOUNT,(err,decode)=>{
            if(err){
                return res.status(401).json({
                    error:'Expired link. Signup again'
                })
            }
            const {name,email,password,confirmePassword,role} = jwt.decode(token)
            const user = new User({name,email,password,confirmePassword,role})
            user.save((err,user)=>{
                if(err){
                    console.log('erreur', err)
                    return res.status(400).json({
                        error:'Erreur de sauvegarde'
                    })
                }
                res.json({
                    message:'Signup success. Please signin.',user
                })
            })
        })
    }else{
        console.log('mauvaise token')
    }
}