const { response } = require("express");
const { body, param , query } = require("express-validator");
const express = require("express");

const controller = require("../Controllers/medicineController")

const router = express.Router()

//-------- Start Get-------------
router.get("/list", controller.getMedicine)
//-------- End Get---------------

//-------- Start Post------------
router.post("/add",[
    body("Med_id").isInt().withMessage("id should be Number"),
    body("medicineName").isAlpha().withMessage("Medicine name should be string"),
    body("category").isAlpha().withMessage("Medicine category should be string"),
    body("companyName").isAlpha().withMessage("Company name should be string"),
    body("price").isInt().withMessage("Price should be Integer"),
    body("stock").isInt().withMessage("stock should be Integer")
] ,controller.createMedicine)
//-------- End Post-------------

//-------- Start Update-------------
router.put("/update", controller.updateMedicine)
//-------- End Update-------------

//-------- Start Delete-------------
router.delete("/delete/:Med_id",[
    param("Med_id").isInt().withMessage("Id should be Integer")
], controller.deleteMedicine)
//-------- End Delete-------------



module.exports = router;