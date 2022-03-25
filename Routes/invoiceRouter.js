const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();

const controller=require("./../Controllers/invoicesController")
router.get("",controller.getAllinvoices );
router.get("/:id?",controller.getInvoice);
router.post("",[
    body("bill_id").isInt().withMessage("preID should be Integer"),
    body("admission_id").isInt().withMessage("preID should be Integer"),
    body("patient_id").isInt().withMessage("Patient ID should be Integer"),
    body("doctor_id").isInt().withMessage("doctor ID should be Integer"),
    body("admit_date").isDate().withMessage("admit_date should be Date"),
    body("totalPrice").isDecimal().withMessage("price  should be number"),
    body("paymentMethod").isString().withMessage("paymentMethod should be string"),
    body("paymentStatus").isString().withMessage("paymentStatus should be string")
],controller.createInvoice);
router.delete("/:id",controller.deleteInvoice);
router.put("/:id",controller.updateInvoice);


module.exports=router;