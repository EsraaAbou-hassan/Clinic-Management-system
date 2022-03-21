const {validationResult}=require("express-validator");
const Invoices=require("./../Models/invoiceSchema");

exports.getAllinvoices=(request,response)=>{
    Invoices.find({}).then(
        data=>{
            response.status(200).json(data)
           
        }).catch(error=>{
             next(error);
         
    })
}


exports.getInvoice=(request,response,next)=>{
    Invoices.findOne({bill_id:request.params.id}).then(data=>{
        if(data==null) next(new Error("Invoice is not found"))
        response.status(200).json(data)
    }) 
    .catch(error=>{
        next(error);
    })
    }

    exports.createInvoice = (request, response, next) => {
        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
            throw error;
        }
        let object = new Invoices({
            bill_id: request.body. bill_id,
            admission_id: request.body.admission_id,
            patient_id: request.body.patient_id,
            doctor_id: request.body.doctor_id,
            admit_date:request.body.admit_date,
            totalPrice:request.body. totalPrice,
            paymentMethod:request.body. paymentMethod,
            paymentStatus:request.body. paymentStatus
        })
        object.save()
            .then(data => {
                response.status(201).json({ message: "added", data })
           
            })
            .catch(error => {next(error);          
            })
    
    
    }
    
    exports.deleteInvoice= async (request, response, next) => {
        try {
            let data = await Invoices.deleteOne({bill_id:request.params.id})
            if (data == null) throw new Error("Invoice Is not Found!")
            response.status(200).json({ message: "deleted" })
        } catch (error) {
            next(error);    
        }
    
    }
    

    exports.updateInvoice = (request, response, next) => {
   
        Invoices.updateOne({bill_id:request.params.id},{
            $set:{
                admission_id: request.body.admission_id,
                patient_id: request.body.patient_id,
                doctor_id: request.body.doctor_id,
                admit_date:request.body.admit_date,
                totalPrice:request.body. totalPrice,
                paymentMethod:request.body. paymentMethod,
                paymentStatus:request.body. paymentStatus
            }
        })
       
                 
                  .then(data=>{
                    if (!data) 
                    throw new Error("invoice Is not Found!")
                    response.status(200).json({ message: "updated", data })
                  })
                  .catch(error=>next(error))
    
    }