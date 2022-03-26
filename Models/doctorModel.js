const mongoose=require("mongoose");
const schema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
     },
        
     firstName:{
        type:String,
         required:true   
      },
      lastName:{
        type:String,
         required:true   
      },
      phone:{
        type:Number,
        required:true
     },
     age:{
        type:Number,
        required:true
     },
     gender:{
      type:String,
      enum:["female","male"]
      
      },
     specilization: {
        type:String,
         required:true   
      },
      
      Degree:{
        type:String,
         required:true   
      },
      Department:{
        type:String,
         required:true   
      },
      join_Date:{
      //   type:String,
         type:Date,
         required:true   
      },address:{
         type:Object,
         required:true,   
           
            street:{
                  type:String,
                   required:true 
                  },
               city:{
                  type:String,
                  required:true 
               }

       
      },
      email: {
        type:String,
         required:true   
      },
      password: {
        type:String,
         required:true   
      },
      
      img:{
         type:String,
         required:true  
      //    data: Buffer,
      //   contentType: String 
      },

});

//2- register for schema in mongoose
module.exports=mongoose.model("Doctor",schema);