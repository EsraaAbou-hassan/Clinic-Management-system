const {validationResult}=require("express-validator");
const mongoose=require("mongoose")
let User=require("../Models/userModel");
let Patient=require("../Models/patientModel");

//login controller
exports.login=(request,response,next)=>{
    let result=validationResult(request);
    if(!result.isEmpty()){
        let error=new Error();
        error.status=422;
        error.message=result.array().reduce((total,current)=>total+current.msg+" , ","");
        next(error);
    }
    else{
        User.findOne({Email:request.body.userEmail})
            .then(result=>{
                if(result.password==request.body.userPassword){
                    response.status(201).json({message:result.userType+"login",data:result.name});
                }
                else{
                    response.status(500).json({message:"invalid password"})
                }
            })
            .catch(error=>{
                response.status(500).json({message:"email not found"})
            })
    }

}
//register controller
exports.register=(request,response,next)=>{

    let result=validationResult(request);
    if(!result.isEmpty()){
        let error=new Error();
        error.status=422;
        error.message=result.array().reduce((total,current)=>total+current.msg+" , ","");
        next(error);
    }else{
                let userObject=new User({
                    name:request.body.userName,
                   
                    Email:request.body.userEmail,
                    password:request.body.userPassword,
                    userType:request.body.userType,
                   
                });
                userObject.save()
                .then((result)=>{
                    response.json({massage:"Register Successfully"})
                    console.log("user registered successfully")
            })
                .catch((error)=>{error.status=500;next(error)});


  
}}
           