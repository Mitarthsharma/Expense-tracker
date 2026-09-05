const express=require("express")
const authController=require("../controller/auth.controller");
const {registerValidation,loginValidation} = require("../validators/auth.validator");
const validationMiddleware = require("../middleware/validator.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const router=express.Router();
router.post("/register",registerValidation,validationMiddleware,authController.createUser);
router.post("/login",loginValidation,validationMiddleware,authController.userLogin);
router.get("/me",authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"you are authenticated",
        user:req.user
    })
})
module.exports=router