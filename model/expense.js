const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Expense=sequelize.define('expense',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    expensename:{
        type: Sequelize.STRING,
        allowNull: false
    },
    typeofexpense:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    expenseprice:{
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

module.exports=Expense
