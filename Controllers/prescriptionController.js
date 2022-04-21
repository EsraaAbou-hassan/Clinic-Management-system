const {validationResult}=require("express-validator");
const Prescription=require("./../Models/prescriptionSchema")

exports.getAllprescriptions=(request,response,next)=>{
    Prescription.find({}).populate('patient_id','firstName lastName').populate('doctor_id','firstName lastName').populate('Med_id', 'Med_id medicineName'). then(
        data=>{
            response.status(200).json(data)
           
        }).catch(error=>{
             next(error);
         
    })
}

exports.getPrescription=(request,response,next)=>{
Prescription.findOne({pre_id:request.params.id}).populate('patient_id','firstName lastName').populate('doctor_id','firstName lastName').populate('Med_id', 'Med_id medicineName').then(data=>{
    if(data==null) next(new Error("Prescription is not found"))
    response.status(200).json(data)
}) 
.catch(error=>{
    next(error);
})
}

exports.createPrescription = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
  
    let object = new Prescription({
        pre_id: request.body.pre_id,
        patient_id: request.body.patient_id,
        doctor_id: request.body.doctor_id,
        Med_id:request.body.Med_id
        
    })
    object.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
           
        })
        .catch(error => {
            next(error);    
            console.log(error)   
             
        })


}

exports.deletePrescription= async (request, response, next) => {
    try {
        let data = await Prescription.deleteOne({pre_id:request.params.id})
        if (data == null) throw new Error("Prescription Is not Found!")
        response.status(200).json({ message: "deleted" })
    } catch (error) {
        next(error);    
    }

}

exports.updatePrescription = (request, response, next) => {
   
    Prescription.updateOne({pre_id:request.params.id},{
        $set:{
        patient_id: request.body.patient_id,
        doctor_id: request.body.doctor_id,  
        Med_id:request.body.Med_id
      
        }
    })
   
             
              .then(data=>{
                if (!data) 
                throw new Error("Prescription Is not Found!")
                response.status(200).json({ message: "updated", data })
              })
              .catch(error=>next(error))

}