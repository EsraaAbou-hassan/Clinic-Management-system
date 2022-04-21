const { validationResult } = require("express-validator");
const Employee = require("./../Models/employeeModel");

exports.getEmployee = (request, response, next) => {
    console.log('res')
    Employee.find({}).then((result) => {   
        response.status(200).json(result);
    }).catch((error) => {
        error.status = 500;
        next(error)
    })
};

exports.addEmployee = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        next(error);
    }
    else {
        const {image,deignation,id,email,mobile}=request.body
        console.log('request.body',request.body)
   
        let employeeObject = new Employee({
        Emp_id:id,
        image: image,
        deignation:deignation,
        mobile:mobile,
        email:email,
        date:new Date(),
        address:{city:"citt mm",street:"street"}
    })
    employeeObject.save().then((result) => {
        console.log("Added successfuly");
        response.status(201).json({ message: 'added' })    
    }).catch((error) => {
        error.status = 500;
        next(error)
    })
}
}

exports.deleteEmp=async(req,res,next)=>{
    const empId=req.params.id
    try {
        let data = await Employee
        .deleteOne({Emp_id:empId})
        if (data == null) throw new Error("Emp Is not Found!")
        res.status(200).json({ message: "deleted" })
    } catch (error) {
        next(error);    
    }
}
exports.updateEmployee = (request, response,next) => {
    Employee.updateOne({ id: request.body.Emp_id },
        {
            $set: {
                image: request.body.image,
                deignation: request.body.deignation,
                mobile: request.body.mobile,
                email: request.body.email,
                date: request.body.date,  
               // address:{
                    //street:request.body.address.street,
                    //city:request.body.address.city,
               //}
            }
    }).then((result)=>{
    response.status(201).json({ message: 'Updated' })
    }).catch((error)=>{
        error.status=500;
        next(error)
    })

}