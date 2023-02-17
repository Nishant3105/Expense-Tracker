const express=require('express')
const bodyParser=require('body-parser')


const sequelize=require('./util/database')
const exproutes=require('./routes/exproutes')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(exproutes)

sequelize
 .sync()
 .then(app.listen(3010))
 .catch(err=>console.log(err))
 



