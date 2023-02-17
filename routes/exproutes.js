const express=require('express')

const routes=express.Router()

const expController=require('../controller/expController')

routes.get('/getExpense',expController.getExpense)

routes.post('/postExpense',expController.postExpense)

routes.delete('/deleteExpense/:id',expController.deleteExpense)

// routes.patch('/editExpense',expController.editExpense)

module.exports=routes