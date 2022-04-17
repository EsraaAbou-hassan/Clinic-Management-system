const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const controller=require('../Controllers/authController');

//loginRouter
router.post("/signIn",
[body("userEmail").isEmail().withMessage("Invalid Email")]
,controller.login);

//RegisterRouter
router.post("/signUp",
[
//  body("id").isInt().withMessage("id should be number"),
 body("userName").isAlpha().withMessage("fisrt name should be string"),
//  body("lastName").isAlpha().withMessage("last name should be string"),
 body("userEmail").isEmail().withMessage("Please Enter Valid Email"),
//  body("gender").isAlpha().withMessage("gender should be string and has one value male or female"),
//  body("phone").isAlphanumeric().withMessage("phone should be string"),
//  body("address").isObject().withMessage("enter valid address"),
//  body("userType").isAlpha().withMessage("user type should be string"),
 body("userPassword").isAlphanumeric().withMessage("password should be string and number").isLength({min:5}).withMessage("paswword should at least contains 5 letters"),
 body("ConfirmuserPassword").custom((value, { req })=>{
    if (value !== req.body.userPassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
}),
]
,controller.register);
module.exports=router;