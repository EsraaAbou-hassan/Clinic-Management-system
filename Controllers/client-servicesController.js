const {validationResult}=require("express-validator");
const ClientService=require("./../Models/client-servicesModel");

exports.getAllClientService=(request,response)=>{
    ClientService.find({}).then(
        data=>{
            response.status(200).json(data)
           
        }).catch(error=>{
             
         
    })
}
exports.getAllClientServiceId=(request,response,next)=>{
    ClientService.findOne({_id:request.params.id}).then(data=>{
        if(data==null) next(new Error("ClientService is not found"))
        response.status(200).json(data)
    }) 
    .catch(error=>{
        next(error);
    })
    }
exports.AddClientService = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
        let object = new ClientService({
            _id: request.body._id,
           
            manager_name: request.body.manager_name,
            phone: request.body.phone,
            number_of_of_doctors: request.body.number_of_of_doctors,
           
            specilization: request.body.specilization,
            number_of_of_nurses: request.body.number_of_of_nurses,
            floor_number: request.body.floor_number,
            
             

           

            



         
        })
        object.save()
            .then(data => {
                response.status(200).json({ message: "added", data })
                
           
            })
            .catch(error => {next(error);          
            })

            
    
    
    }


    
    exports.updateClientService = (request, response, next) => {
   
        ClientService.updateOne({_id:request.params.id},{
            $set:{
                _id: request.body._id,
           
            manager_name: request.body.manager_name,
            phone: request.body.phone,
            number_of_of_doctors: request.body.number_of_of_doctors,
           
            specilization: request.body.specilization,
            number_of_of_nurses: request.body.number_of_of_nurses,
            floor_number: request.body.floor_number,
            
    
                
            }
        }).then(data=>{
                    if (!data) 
                    throw new Error("client_service Is not Found!")
                    response.status(200).json({ message: "updated", data })
                  }).catch(error=>next(error))
    
    }
    exports.deleteClientService= async (request, response, next) => {
        try {
            
            let data = await  ClientService.deleteOne({_id:request.params.id})
            if (data == null)
                throw new Error("client Service not found Is not Found!")
             else 
                response.status(200).json({ message: "deleted" })
        } catch (error) {
            next(error);    
        }
      console.log("kkkkkk");
    }