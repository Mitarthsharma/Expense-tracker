const mongoose=require("mongoose");
const expenseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
    

},{
    timestamps:true
})
const expenseModel=mongoose.model("expense",expenseSchema);
module.exports=expenseModel