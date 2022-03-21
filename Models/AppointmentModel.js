const mongoose=require("mongoose");

// create department schema

const appointmentModel=new mongoose.Schema({
    id:{ type:Number,require:true,unique:true},
    PatientName:String,
    PatientEmail:String,
    PatientMobile:String,
    PatientGender:String,
    appointmentDate:Date,
    appointmentTime:String,
    doctorName:String
});

module.exports=mongoose.model("Appointment",appointmentModel);
