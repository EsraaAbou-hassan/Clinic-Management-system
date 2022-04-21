const { response } = require("express");
const { body, param , query } = require("express-validator");
const express = require("express");

const controller = require("../Controllers/employeeController")

const router = express.Router()

//-------- Start Get-------------
router.get("/list", controller.getEmployee)
//-------- End Get---------------

//-------- Start Post------------
router.post("/Add",
[
    body("id").isInt().withMessage("id should be Number"),
    // body("medicineName").isAlpha().withMessage("Medicine name should be string"),
    // body("category").isAlpha().withMessage("Medicine category should be string"),
    // body("companyName").isAlpha().withMessage("Company name should be string"),
    // body("price").isInt().withMessage("Price should be Integer"),
    // body("stock").isInt().withMessage("stock should be Integer")
] 
,controller.addEmployee)
//-------- End Post-------------

// //-------- Start Update-------------
 router.put("/update", controller.updateEmployee)
// //-------- End Update-------------

// //-------- Start Delete-------------
router.delete("/delete/:id",[
    param("id").isInt().withMessage("Id should be Integer")
], controller.deleteEmp)
// //-------- End Delete-------------



module.exports = router;