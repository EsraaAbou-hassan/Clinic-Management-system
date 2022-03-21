const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const patientModel=new Schema({
    _id:Number,
    firstName:String,
    lastName:String,
    gender:{type:String,enum:["Female","Male"]},
    phone:String,
    address:{type:Object}
})

module.exports=model("patient",patientModel);