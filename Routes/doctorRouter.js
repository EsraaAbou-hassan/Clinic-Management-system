const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();

const controller=require("./../Controllers/doctorController")
router.get("",controller.getAllDoctors );
router.get("/:id?",controller.getDoctorById);
router.post("/post",[
    
    
    body("_id").isInt().withMessage("id must be integer"),
    body("firstName").isAlpha().withMessage("doctor first Name must by string"),
    body("lastName").isAlpha().withMessage("doctor last Name must by string"),
   
    body("phone").isInt().withMessage("Invalid Mobile phone"),
    body("age").isInt().withMessage("Invalid age  must by integer "),
    body("gender").isAlpha().withMessage("Invalid gender must be 'female'or 'male'"),
   
    body("specilization").isAlpha().withMessage("doctor  specilization must by string"),
    body("Degree").isAlpha().withMessage("doctor Degree must by string"),
  //  body("Department").isAlpha().withMessage("doctor Department must by string"),
    body("join_Date").isDate().withMessage("invalid date"),
     body("address").isObject().withMessage("invalid address"),
    body("email").isEmail().withMessage("invalid email"),
  //  body("password").isAlpha().withMessage("invalid  password "), 
   // body("img").isAlpha().withMessage("invalid img"),  
     
   
],controller.AddDoctor);
router.put("/edit/:id",controller.updateDoctor);
router.delete("/delete/:id",controller.deleteDoctor);

module.exports=router;