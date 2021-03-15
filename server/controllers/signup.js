const User = require('../models/auth.models')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'musadiagne613@gmail.com',
        pass:'JtppEtmmnEtmoi1927@vie'
    }
})

exports.signup = (req,res)=>{
    let {name,email,password,confirmePassword,role} = req.body
    User.findOne({email},(err,user)=>{
        if(user){
           return res.status(400).json({
                error:'ce mail existe deja'
            })
        }
        if(password !== confirmePassword){
            return res.status(400).json({
                error:"les deux mot de passe ne sont pas identique"
            })
        }
        const token = jwt.sign({name,email,password,role},process.env.SECRET_ACTIVATE_ACCOUNT,{expiresIn:'10m'})
        const emailData = {
            from:'musadiagne613@gmail.com',
            to:email,
            subject:'Activation de compte',
            html:`
                <h1>Activer votre compte</h1>
                <p>cveuillez cliquer sur ce lien ${process.env.CLIENT_URI}/auth/activate/${token} pour activer votre compte. </p>
            `
        }
        transporter.sendMail(emailData).then(()=>{
            res.status(200).json({
                message:`Un mail vous a ete envoyer sur ${email} veuillez suivre les instruction pour activer votre compte`
            })
        }).catch(e=>{
            console.log('erreur ',e)
        })
    })
}