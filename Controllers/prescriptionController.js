const {validationResult}=require("express-validator");
const Prescription=require("./../Models/prescriptionSchema")

exports.getAllprescriptions=(request,response)=>{
    Prescription.find({}).then(
        data=>{
            response.status(200).json(data)
           
        }).catch(error=>{
             next(error);
         
    })
}

exports.getPrescription=(request,response,next)=>{
Prescription.findOne({pre_id:request.params.id}).then(data=>{
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
        drug:request.body.drug,
        drug_id:request.body.drug_id,
        quantity:request.body.quantity
        
    })
    object.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
       
        })
        .catch(error => {next(error);          
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
        drug:request.body.drug,
        drug_id:request.body.drug_id,
        quantity:request.body.quantity
        }
    })
   
             
              .then(data=>{
                if (!data) 
                throw new Error("Prescription Is not Found!")
                response.status(200).json({ message: "updated", data })
              })
              .catch(error=>next(error))

}