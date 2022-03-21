const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const userModel=new Schema({
    _id:Number,
    email:{type:String,required:true,unique:true},
    password:String,
    userType:{
        type:String,
        enum:["patient","doctor","employee"],
        //default:"patient",
        required:true
    },
    userID:{type:Number,ref:"patient",required:true}
   
})
module.exports=model("users",userModel);