const mongoose=require("mongoose");

//1- build schema with validations
const schema = new mongoose.Schema({
    bill_id: {
        type:Number,
        required:true
     },
     admission_id: {
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
      admit_date: {
        type:Date,
         required:true   
      },
      totalPrice: {
        type:Number,
         required:true   
      },
      paymentMethod: {
        type:String,
         required:true   
      },
      paymentStatus:{
        type:String,
        required:true  
      }


});

//2- register for schema in mongoose
module.exports=mongoose.model("Invoices",schema);