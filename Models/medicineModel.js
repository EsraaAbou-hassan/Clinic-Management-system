const mongoose = require('mongoose');

//------ Create Validation Schema ---------
const medicineModel = mongoose.Schema({
    Med_id: {type: Number, require: true, unique:true},
    medicineName: {type: 'string', require: true, unique:true},
    category: {type: 'string', require: true},
    companyName:{type: 'string', require: true},
    price:{type: Number, require: true},
    expiryDate:{type: Date, require: true},
    stock:{type: Number},
})


module.exports = mongoose.model("Medicine", medicineModel)