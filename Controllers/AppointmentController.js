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
            patientName:req.body.PN,
            patientEmail:req.body.PE,
            PatientMobile:req.body.PM,
            patientGender:req.body.PG,
            appointmentDate:req.body.AD,
            appointmentTime:req.body.AT,
            doctorName:req.body.DN,
        
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
            appointmentId:req.body.id,
            patientName:req.body.PN,
            patientEmail:req.body.PE,
            PatientMobile:req.body.PM,
            patientGender:req.body.PG,
            appointmentDate:req.body.AD,
            appointmentTime:req.body.AT,
            doctorName:req.body.DN,
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
  
            Appointment.deleteOne({id:req.params.id})
            .then(result=>{
                res.status(201).json({message:"deleted"})
    
            })
            .catch(error=>{
                error.status=500;
                next(error);
            })      
    }
    
    