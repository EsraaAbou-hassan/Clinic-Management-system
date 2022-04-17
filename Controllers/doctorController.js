const {validationResult}=require("express-validator");
const doctor=require("./../Models/doctorModel");

exports.getAllDoctors=(request,response)=>{
    doctor.find({}).then(
        data=>{
            response.status(200).json(data)
           
        }).catch(error=>{
             
         
    })
}
exports.getDoctorById=(request,response,next)=>{
    doctor.findOne({_id:request.params.id}).then(data=>{
        if(data==null) next(new Error("Doctor is not found"))
        response.status(200).json(data)
    }) 
    .catch(error=>{
        next(error);
    })
    }
exports.AddDoctor = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
        let object = new doctor({
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
                 street:request.body.address.street,
                 city:request.body.address.city,
            },
             email:request.body.email,
             password:request.body.password,
             img:request.body.img
            //  img:{
            //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            //     contentType: 'image/png'
            //  }
             

           

            



         
        })
        object.save()
            .then(data => {
                response.status(200).json({ message: "added", data })
                
           
            })
            .catch(error => {next(error);          
            })

            
    
    
    }


    
    exports.updateDoctor = (request, response, next) => {
   
        doctor.updateOne({_id:request.params.id},{
            $set:{
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
                 email:request.body.email,
                 password:request.body.password,
                 img:request.body.img,
                
                //  img:{
                    // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    // contentType: 'image/png'
                //  }
                 
    
               
    
                
            }
        }).then(data=>{
                    if (!data) 
                    throw new Error("Doctor Is not Found!")
                    response.status(200).json({ message: "updated", data })
                  }).catch(error=>next(error))
    
    }
    exports.deleteDoctor= async (request, response, next) => {
        try {
            
            let data = await doctor.deleteOne({_id:request.params.id})
            if (data == null)
                throw new Error("doctor Is not Found!")
             else 
                response.status(200).json({ message: "deleted" })
        } catch (error) {
            next(error);    
        }
    
      console.log("kkkkkk");
    }