const mongoose=require("mongoose");

//1- build schema with validations
const schema=new mongoose.Schema({
pre_id: {
    type:Number,
    required:true
 },
 patient_id: {
    type:Number,
    ref:"patients",
    required:true
 },
doctor_id: {
   type:Number,
    ref:"doctors",
    required:true   
 },
 drug:{
   type: "object",
   
       properties: {
drug_id: {
   type:Number,  
    required:true

 },
quantity: {
   type:Number,
      required:true
     
 }
           
           }
     }
    
});

//2- register for schema in mongoose
module.exports=mongoose.model("prescriptions",schema);