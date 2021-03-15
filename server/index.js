const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const authRouter = require('./router/auth')

mongoose.connect(config.MONGODB_URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>console.log('connexion reussie'))
.catch(e=>console.log('connexion echouer',e))

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/', authRouter)
app.listen(config.PORT,()=>console.log('connexion sur la port', config.PORT))