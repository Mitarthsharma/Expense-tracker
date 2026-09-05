const express=require("express");
const connectDb=require("./db/db");
const cookieParser = require("cookie-parser");
const expenseRouter=require("./routes/expense.routes")
const cors=require("cors")
const authRouter=require("./routes/auth.routes")
const app=express();
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/auth",authRouter)
app.use("/expense",expenseRouter)
module.exports=app