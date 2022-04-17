const express = require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/AppointmentController");

// list All appointment
router.get("",controller.getALlAppointment);

// add new Appointment
router.post("",[
    body("id").isInt().withMessage("id must be integer"),
    body("PatientName").isAlpha().withMessage("Patient Name must by string"),
    body("DoctorName").isAlpha().withMessage("doctor Name must by string"),
    body("PatientEmail").isEmail().withMessage("Invalid Email "),
    body("PatientMobile").isInt().withMessage("Invalid Mobile phone"),
],controller.createAppointment);

//update Appointment

router.put("",[
    body("PatientName").isAlpha().withMessage("Patient Name must by string"),
    body("DoctorName").isAlpha().withMessage("doctor Name must by string"),
    body("PatientEmail").isEmail().withMessage("Invalid Email "),
    body("PatientMobile").isInt().withMessage("Invalid Mobile phone"),
],controller.updateAppointment);


// delete appointment
router.delete("/:Id",controller.deleteAppointment);

module.exports=router;
