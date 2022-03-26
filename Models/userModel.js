const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const userModel=new Schema({
    
    name:String,
    Email:{type:String,required:true,unique:true},
    password:String,
    userType:{
        type:String,
        enum:["patient","doctor","employee"],
       
        required:true
    },
   
})
module.exports=model("users",userModel);