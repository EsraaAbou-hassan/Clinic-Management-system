const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();

const controller=require("./../Controllers/prescriptionController")
router.get("",controller.getAllprescriptions);
router.get("/:id?",controller.getPrescription);
router.post("",[
    body("pre_id").isInt().withMessage("preID should be Integer"),
    body("patient_id").isInt().withMessage("Patient ID should be Integer"),
    body("doctor_id").isInt().withMessage("doctor ID should be Integer"),
    body("drug.drug_id").isInt().withMessage("drug ID should be Integer"),
    body("drug.quantity").isInt().withMessage("quantity ID should be Integer")
],controller.createPrescription);
router.delete("/:id",controller.deletePrescription);
router.put("/:id",controller.updatePrescription);


module.exports=router;