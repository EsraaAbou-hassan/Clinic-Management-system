const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();

const controller=require("./../Controllers/client-servicesController")
router.get("",controller.getAllClientService);
router.get("/:id?",controller.getAllClientServiceId);
router.post("/post",[
    
    
    body("_id").isInt().withMessage("id must be integer"),
    body("manager_name").isAlpha().withMessage("doctor manager_name must by string"),
    
   
    body("phone").isInt().withMessage("Invalid Mobile phone"),
    body("number_of_of_doctors").isInt().withMessage("Invalid number_of_of_doctors  must by integer "),
    body("number_of_of_nurses").isInt().withMessage("Invalid number_of_of_nurses  must by integer "),
    body("floor_number").isInt().withMessage("Invalid number_of_of_doctors  must by integer "),
    
   
    body("specilization").isAlpha().withMessage("doctor  specilization must by string"),
   
     
   
],controller.AddClientService);
router.put("/edit/:id",controller.updateClientService);
router.delete("/delete/:id",controller.deleteClientService);

module.exports=router;