const expenseModel=require("../models/expense.model");
const mongoose = require("mongoose");
const createExpense=async(req,res)=>{
const {title,amount,category,type,description,date}=req.body
const user=req.user.userId;
const expense=await expenseModel.create({
    title,
    amount,
    category,
    type,
    description,
    date,
    user
})
res.status(201).json({
    message:"Expense added",
    expense
})
}
const getExpense=async (req,res)=>{
    const user=req.user.userId;
    const expenses=await expenseModel.find({user:user})
    res.status(200).json({
        message:"Expense fetched successfully",
        expenses
    })
}
const deleteExpense=async(req,res)=>{
    const expenseId=req.params.id;
    const removeExpense=await expenseModel.findOneAndDelete({_id:expenseId,user: req.user.userId})
    if(!removeExpense){
        return res.status(409).json({
            message:"Expense does not exists"
        })
    }
    res.status(200).json({
        message:"Expense removed successfully"
    })

}
const updateExpense=async(req,res)=>{
const expenseId=req.params.id;
const update=await expenseModel.findOneAndUpdate({_id:expenseId,user:req.user.userId},req.body);
 if(!update){
        return res.status(404).json({
            message:"Expense does not exists"
        })
    }
    res.status(200).json({
        message:"Expense updated successfully"
    })

}
const getSummary = async (req, res) => {

    const summary = await expenseModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user.userId)
            }},
            {
             $group: {
            _id: "$type",
            total: {
                $sum: "$amount"
            }
        }
        }
    ]);
    let totalIncome=0;
    let totalExpense=0;
for(const item of summary){
    if(item._id=="income"){
        totalIncome=item.total;

    }
    if(item._id=="expense"){
         totalExpense=item.total;
    }
}
const totalBalance=totalIncome-totalExpense;
    

    res.status(200).json({
        totalIncome,
        totalExpense,
        totalBalance
    });
};
const expenseSummary = async (req, res) => {

    const summary = await expenseModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user.userId),
                type: "expense"
            }
        },
        {
            $group: {
                _id: "$category",
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);

    console.log(summary);

    res.status(200).json({
        summary
    });
};
module.exports={createExpense,getExpense,deleteExpense,updateExpense,getSummary,expenseSummary}