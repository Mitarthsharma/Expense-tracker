const express=require("express")
const expenseController=require("../controller/expense.controller")
const authMiddleware = require("../middleware/auth.middleware")
const router=express.Router()
router.post("/create",authMiddleware,expenseController.createExpense)
router.get("/get",authMiddleware,expenseController.getExpense)
router.delete("/delete/:id",authMiddleware,expenseController.deleteExpense);
router.patch("/update/:id",authMiddleware,expenseController.updateExpense)
router.get("/summary", authMiddleware, expenseController.getSummary);
router.get("/category_expense", authMiddleware, expenseController.expenseSummary);
module.exports=router