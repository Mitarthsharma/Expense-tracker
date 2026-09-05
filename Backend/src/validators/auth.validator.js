const {body,validationResult}=require("express-validator");
const registerValidation = [
    body("username")
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];

const loginValidation=[
    body("email")
    .notEmpty()
    .withMessage("Please Enter email")
    .isEmail()
    .withMessage("Please enter a valid email"),
    body("password")
    .notEmpty()
    .withMessage("Please enter a password")
]
module.exports = {registerValidation,loginValidation};