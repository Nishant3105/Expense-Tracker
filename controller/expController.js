const Expense=require('../model/expense')

exports.getExpense=(req,res,next)=>{
    Expense.findAll()
    .then(expenses=>{
        res.status(200).json({allExpense:expenses})
    })
    .catch(err=>console.log(err))
}

exports.postExpense=async (req,res,next)=>{
    try{
        if(req.body.ename=="" || req.body.etype=="" || req.body.eamount==""){
            throw new Error('please fill all the details')
        }
        console.log(req.body)
        const expensename=req.body.ename
        const typeofexpense=req.body.etype
        const expenseprice=req.body.eamount
        const eId=req.body.id
        Expense.findOne({where: {id:eId}})
        .then(async(obj) => {
            if(obj){
                console.log(obj)
                const data=await obj.update({
                    // id:eId,
                    expensename:expensename,
                    typeofexpense:typeofexpense,
                    expenseprice:expenseprice
                },{where: {id:eId}})
                res.status(200).json({expenseUpdated: data})
            }
            else{
                const data=await Expense.create({
                    expensename:expensename,
                    typeofexpense:typeofexpense,
                    expenseprice:expenseprice
                })
                res.status(200).json({newExpense: data})
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense=(req,res,next)=>{
    const eId=req.params.id
    if(eId){
        Expense.findAll({where: {id:eId}})
         .then(result=>{
            return Expense.destroy({where: {id:eId}})
         })
         .then(result=>{
            res.status(200).json({userDeleted: 'succesfully'})
         })
         .catch(err=>{
            console.log(err)
         })
    }
}

// exports.editExpense=(req,res,next)=>{
    
// }
