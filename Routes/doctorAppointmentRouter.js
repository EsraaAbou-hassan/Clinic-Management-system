const express = require("express");
const router=express.Router();
const controller=require("./../Controllers/doctorAppointmentController");

// list All appointment
router.get("",controller.getALlAppointment);

// add new Appointment
router.post("",controller.createAppointment);


module.exports=router;
