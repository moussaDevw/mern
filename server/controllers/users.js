const User = require('../models/auth.models')

exports.listUser = (req,res)=>{
    User.find({},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:'aucun utilisateur'
            })
        }
        user.password = undefined
        user.confirmePassword = undefined
        res.json(user)
    })
}

exports.listUserId = (req,res)=>{
    User.findById(req.params.id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'aucun utilisateur'
            })
        }
        user.password = undefined
        res.json(user)
    })
}

exports.modyfiUser = (req,res)=>{
    const {name,email} = req.body
    if(!name){
        return res.status(400).json({
            error:'Nom requis'
        })
    }
    if(!email){
        return res.status(400).json({
            error:'E-mail requis'
        })
    }
    const newUser = {
        name,email
    }
    User.findByIdAndUpdate(req.params.id,newUser,{new:true})
    .then(updateUser=>{
        res.json({
            message:'Modification reussie'
        })
    })
    .catch(error=>{
        console.log('error', error)
        Response.status(400).json({
            error:'Modification echouer'
        })
    })
}

exports.modifyRole = (req,res)=>{
    const {role} = req.body
    User.findById(req.params.id,(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'Aucun utilisateur'
            })
        }
        user.role = role
        user.save((err,updateRole)=>{
            if(err){
                return res.status(400).json({
                    error:'La mis a jour est echouer'
                })
            }
            user.password = undefined
            res.json({
                message:'mis a jour effectuer'
            })
        })
    })
}

exports.deleteUser = (req,res)=>{
    User.findByIdAndDelete(req.params.id,(err,user)=>{
        if(err || !user){
            console.log(err)
            return res.status(400).json({
                error:'Aucun utilisateur'
            })
        }
        res.status(201).json(
            {
                message:`Vous avez supprimer ${user.name}`
            }
        )
    })
}