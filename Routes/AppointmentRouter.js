const express = require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/AppointmentController");

// list All appointment
router.get("",controller.getALlAppointment);

// add new Appointment
router.post("",[
    body("id").isInt().withMessage("id must be integer"),
    body("PN").isAlpha().withMessage("Patient Name must by string"),
    body("DN").isAlpha().withMessage("doctor Name must by string"),
    body("PE").isEmail().withMessage("Invalid Email "),
    body("PM").isInt().withMessage("Invalid Mobile phone"),
    body("DN").isAlpha().withMessage("doctor Name must by string"),
],controller.createAppointment);

//update Appointment

router.put("",[
    body("id").isInt().withMessage("id must be integer"),
    body("PN").isAlpha().withMessage("Patient Name must by string"),
    body("DN").isAlpha().withMessage("doctor Name must by string"),
    body("PE").isEmail().withMessage("Invalid Email "),
    body("PM").isInt().withMessage("Invalid Mobile phone"),
    body("DN").isAlpha().withMessage("doctor Name must by string"),
],controller.updateAppointment);


// delete appointment
router.delete("",controller.deleteAppointment);

module.exports=router;
