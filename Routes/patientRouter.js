const express=require('express');
const router=express.Router();
const {param}=require('express-validator');
const controller=require('../Controllers/patientController');


router.get("",controller.getAllPatients);
router.get("/:id",controller.getPatient);
router.post("",controller.AddPatient);
router.put("/:id",controller.updatePatient);
router.delete("/:id",controller.deletePatient);

module.exports=router;