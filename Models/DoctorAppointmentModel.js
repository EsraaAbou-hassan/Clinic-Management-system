const mongoose=require("mongoose");

// create department schema

const doctorAppointmentModel=new mongoose.Schema({
    doctorName:String,
    appointmentTime:String,
    appointmentDate:Date,
});
module.exports=mongoose.model("DoctorAppointment",doctorAppointmentModel);


