const mongoose=require("mongoose");
const schema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
     },
        
     manager_name:{
        type:String,
         required:true   
      },
      phone:{
        type:Number,
        required:true
     },
     number_of_of_doctors:{
        type:Number,
        required:true
     },
     number_of_of_nurses:{
        type:Number,
        required:true
     },
     floor_number:{
        type:Number,
        required:true
     },
    
     specilization: {
        type:String,
         required:true   
      },
      
      
      
     
});

//2- register for schema in mongoose
module.exports=mongoose.model("Client_service",schema);