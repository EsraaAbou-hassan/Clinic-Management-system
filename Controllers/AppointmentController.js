const {validationResult}=require("express-validator");
const Appointment=require("./../Models/AppointmentModel");
//------------------------listAllAppointment----------------------------------
exports.getALlAppointment=function(req,res,next){
   
    Appointment.find({})
    .then(result=>{
      res.status(200).json(result);
    })
    .catch(error=>{
          error.status=500;
          next(error);
    })
}

//=======================================insert one Appointment====================================
exports.createAppointment=(req,res,next)=>{

     let errors=validationResult(req);
    if(!errors.isEmpty())
    {
        let error=new Error();
        error.status=422;
        error.message=errors.array().reduce((current,object)=> current+object.msg+ " , ","");
        next(error);
       
    }
    else
    {
        let AppointmentObject=new Appointment({
            id:req.body.id,
            PatientName:req.body.PatientName,
            PatientEmail:req.body.PatientEmail,
            PatientMobile:req.body.PatientMobile,
            PatientGender:req.body.PatientGender,
            appointmentDate:req.body.AppointmentDate,
            appointmentTime:req.body.AppointmentTime,
            doctorName:req.body.DoctorName,
            Injury:req.body.injury,
            
        
        });

        AppointmentObject.save()
                        .then(result=>{
                            res.status(201).json({message:"added"});
                        })
                        .catch(error=>{
                            error.status=500;
                            next(error);
                        })

        
    }
    

};
//=======================================update Appointment====================================

exports.updateAppointment=(req,res,next)=>{

    Appointment.updateOne({id:req.body.id},
       {
           $set:{
            PatientName:req.body.PatientName,
            PatientEmail:req.body.PatientEmail,
            PatientMobile:req.body.PatientMobile,
            PatientGender:req.body.PatientGender,
            appointmentDate:req.body.AppointmentDate,
            appointmentTime:req.body.AppointmentTime,
            doctorName:req.body.DoctorName,
            Injury:req.body.injury,
           }
       }).then(result=>{
           res.status(201).json({message:"Updated"})

       })
       .catch(error=>{
           error.status=500;
           next(error);
       })

}
//=======================================Delete Appointment====================================
exports.deleteAppointment=(req,res,next)=>{
  
            Appointment.deleteOne({id:req.params.Id})
            .then(result=>{
                res.status(201).json({message:req.params})
    
            })
            .catch(error=>{
                error.status=500;
                next(error);
            })      
    }
    
    