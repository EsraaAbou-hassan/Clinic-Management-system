const express=require('express');
const router=express.Router();
const {param}=require('express-validator');
const controller=require('../Controllers/patientController');


router.get("",controller.getPatient);
router.get("",controller.getPatientId);
router.post("",controller.AddPatient);
router.put("",controller.updatePatient);
router.delete("",controller.deletePatient);

module.exports=router;