const mongoose=require("mongoose");

//1- build schema with validations
const schema=new mongoose.Schema({
pre_id: {
    type:Number,
    unique:true,
    required:true
 },
 patient_id: {
    type:Number,
    ref:"patients",
    required:true
 },
doctor_id: {
   type:Number,
    ref:"Doctor",
    required:true   
 },

 Med_id:{
   type:Number,  
   ref:"Medicine",
    required:true

 }

    
});

//2- register for schema in mongoose
module.exports=mongoose.model("prescriptions",schema);