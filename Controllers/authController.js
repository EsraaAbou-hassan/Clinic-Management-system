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
        User.findOne({email:request.body.email})
            .then(result=>{
                if(result.password==request.body.password){
                    response.status(201).json({message:"user login"});
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
                    _id:request.body.id, 
                    email:request.body.email,
                    password:request.body.password,
                    userType:request.body.userType,
                    userID:request.body.id
                });
                userObject.save()
                .then((result)=>{ console.log("user registered successfully")})
                .catch((error)=>{error.status=500;next(error)});
                if(request.body.userType=="patient"){
                    let patientObject=new Patient({
                        _id:request.body.id,
                        firstName:request.body.firstName,
                        lastName:request.body.lastName,
                        gender:request.body.gender,
                        phone:request.body.phone,
                        address:request.body.address,
                    });
                    patientObject.save()
                                .then((result)=>{
                                    response.status(201).json({message:"patient registered successfully"})
                                })
                                .catch((error)=>{
                                    error.status=500;
                                    next(error);
                                })
                    
                }else if(request.body.userType=="doctor"){
                    let Doctorobject = new doctor({
                        _id: request.body._id,
                        firstName: request.body.firstName,
                        lastName: request.body.lastName,
                        phone: request.body.phone,
                        age: request.body.age,
                        gender: request.body.gender,
                        specilization: request.body.specilization,
                        Degree: request.body.Degree,
                        Department: request.body.Department,
                        join_Date:request.body.join_Date,
                        // address:request.body.address,
                        address:{
                            street:request.body.address. street,
                            city:request.body.address.city,
                        },
                        email:request.body. email,
                        password:request.body.password,
                        img:request.body.img
                        //  img:{
                        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                        //     contentType: 'image/png'
                        //  }
                        

                    

                        



                    
                    });
                    Doctorobject.save()
                                .then((result)=>{
                                    response.status(201).json({message:"doctor registered successfully"})
                                })
                                .catch((error)=>{
                                    error.status=500;
                                    next(error);
                                })
                }
            





  
}}
           