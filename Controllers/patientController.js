const {validationResult, Result}=require('express-validator');
const Patient=require('../Models/patientModel');
const User=require('../Models/userModel');


exports.getPatient=(req,res,next)=>{
    Patient.find({})
           .then(result=>{
               res.status(201).json(result)
           })
           .catch(error=>{
               error.status=500;
               next(error);
           })
}
//========================================================
exports.updatePatient=(req,res,next)=>{
    Patient.updateOne({_id:req.body.id},{
        $set:{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            gender:req.body.gender,
            phone:req.body.phone,
            address:req.body.address
        }
    })
    .then(result=>{
        res.status(201).json({message:"Updated"})
    })
    .catch(error=>{
        error.status=500;
        next(error);
    })

}
//=========================================================
exports.deletePatient=(req,res,next)=>{
    Patient.deleteOne({_id:req.body.id})
    .then(result=>{
        res.status(201).json({message:"delete"})
    })
    .catch(error=>{
        error.status=500;
        next(error);
    })
    User.deleteOne({_id:req.body.id})
        .then(result=>{
            console.log("user deleted");
        })
        .catch(error=>{
            error.status=500;
            next(error);
        })    
}
