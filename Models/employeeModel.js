const mongoose = require('mongoose');

//------ Create Validation Schema ---------
const employeeModel = mongoose.Schema({
    Emp_id: {type: Number, require: true, unique:true},
    image: {type: 'string', require: true},
    deignation: {type: 'string', require: true},
    mobile:{type:Number , require: true,unique:true},
    email:{type: 'string', require: true,unique:true},
    date:{type: Date, require: true},
    address:{city:{type:'string'},street:{type:'string'}}
    
})


module.exports = mongoose.model("Employee", employeeModel)