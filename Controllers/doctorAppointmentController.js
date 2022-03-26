const {validationResult}=require("express-validator");
const doctorAppointment=require("./../Models/DoctorAppointmentModel");
//------------------------listAllAppointment----------------------------------
exports.getALlAppointment=function(req,res,next){
   
    doctorAppointment.find({})
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

    
        let AppointmentObject=new doctorAppointment({
            
            appointmentDate:req.body.AppointmentDate,
            appointmentTime:req.body.AppointmentTime,
            doctorName:req.body.DoctorName,
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
    
