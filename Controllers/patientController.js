const {validationResult, Result}=require('express-validator');
const Patient=require('../Models/patientModel');
const User=require('../Models/userModel');

//get All Patients=======================================
exports.getAllPatients=(req,res,next)=>{
    Patient.find({})
           .then(result=>{
               res.status(201).json(result)
           })
           .catch(error=>{
               error.status=500;
               next(error);
           })
}

//======================================================
exports.getPatientId=(req,res,next)=>{
    Patient.find({$and:[{"firstName":req.body.firstName},{"lastName":req.body.lastName}]})
           .then(result=>{
               res.status(201).json(result)
           })
           .catch(error=>{
               error.status=500;
               next(error);
           })
}
//========================================================

// //========================================================
// exports.updatePatient=(req,res,next)=>{
//     Patient.updateOne({_id:req.body.id},{
//get one patient=========================================
exports.getPatient = (req, res, next) => {
    Patient.findOne({_id:req.params.id})
        .then(result => {
            if (!result) {
                next(new Error("Patient id not Found"))               
                res.status(500).json(result)
            }
            else{
                res.status(200).json(result)
            }
        })
        .catch(error => {
            next(error);
        })
}
//Add Patient=============================================
exports.AddPatient = (req, res, next) => {
    //console.log(req.file)
    let patientObj = new Patient({
        _id: req.body._id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        phone:req.body.phone,
        address:req.body.address
        //image: req.file.filename
    })
    patientObj.save()
        .then(data => {
            res.status(201).json({ message: "Patient added Successfully", data })
        })
        .catch(error =>{error.status=500; next(error)})
    // let userObj=new User({
    //     _id:req.body.id, 
    //     email:req.body.email,
    //     password:req.body.password,
    //     userType:req.body.userType,
    //     userID:req.body.id

    // })
    // userObj.save()
    // .then(data=>{
    //     console.log("User Added")
    // })
    // .catch(error =>{error.status=500; next(error)})
}

//Update Patient======================================================

exports.updatePatient=(req,res,next)=>{
    Patient.findByIdAndUpdate({_id:req.params.id},{
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
//delete Patient=====================================================
exports.deletePatient=async(req,res,next)=>{
    try {
        let data = await Patient.deleteOne({_id:req.params.id})
        //data=await User.findByIdAndDelete({_id:req.params.id});
        if (data == null) throw new Error("Patient Is not Found!")
        res.status(200).json({ message: "deleted" })
    } catch (error) {
        error.status=500;
        next(error)
    }
  

   /* Patient.deleteOne({_id:req.body.id})
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
        }) */   
}


//Add Patient=============================================
exports.AddPatient = (req, res, next) => {
    //console.log(req.file)
    let patientObj = new Patient({
        _id: req.body._id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        phone:req.body.phone,
        address:req.body.address
        //image: req.file.filename
    })
    patientObj.save()
        .then(data => {
            res.status(201).json({ message: "Patient added Successfully", data })
        })
        .catch(error =>{error.status=500; next(error)})}
