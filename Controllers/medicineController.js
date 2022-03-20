const { validationResult } = require("express-validator");
const Medicine = require("./../Models/medicineModel");


exports.getMedicine = (request, response, next) => {
    Medicine.find({}).then((result) => {
        response.status(200).json(result);
    }).catch((error) => {
        error.status = 500;
        next(error)
    })
    // response.status(200).json([
    //     {medicineName: 'Ketofan', category:'heart', companyName:'Eva Pharma', price: 20, expiryDate:"15/3/2023", stock: 120},
    //     {medicineName: 'Ogmantine', category:'bones', companyName:'Echo Pharma', price: 205, expiryDate:"23/6/2024", stock: 200},
    //     {medicineName: 'Emox', category:'liver', companyName:'Organo Pharma', price: 65, expiryDate:"8/12/2024", stock: 60}
    //     {
    //         "medicineName": "Rivo",
    //         "category":"Brain", 
    //         "companyName":"Organo Pharma",
    //         "price": "130",
    //         "expiryDate":"6/10/2025", 
    //         "stock": "300"

    //    }
    // ])
};

exports.createMedicine = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        next(error);
    } else {
        let medicineObject = new Medicine({
            Med_id: request.body.Med_id,
            medicineName: request.body.medicineName,
            category: request.body.category,
            companyName: request.body.companyName,
            price: request.body.price,
            expiryDate: request.body.expiryDate,
            stock: request.body.stock
            //[ "medicineName", "category", "companyName", "price", "expiryDate", "stock"]000002222222222222222222222
        })
        medicineObject.save().then((result) => {
            response.status(201).json({ message: 'added' })
            console.log("Added successfuly");
        }).catch((error) => {
            error.status = 500;
            next(error)
        })
    }
}




exports.updateMedicine = (request, response,next) => {
    Medicine.updateOne({ Med_id: request.body.Med_id },
        {
            $set: {
                medicineName: request.body.medicineName,
                category: request.body.category,
                companyName: request.body.companyName,
                price: request.body.price,  
                expiryDate: request.body.expiryDate,
                stock: request.body.stock,
            }
    }).then((result)=>{
    response.status(201).json({ message: 'Updated' })
    }).catch((error)=>{
        error.status=500;
        next(error)
    })

}

// exports.deleteMedicine = (request, response, next) => {
//     let errors = validationResult(request);

//     if (!errors.isEmpty()) {
//         let error = new Error();
//         error.status = 422;
//         error.message = errors.array().reduce((current, object) => current + object.msg + " ", "");
//         next(error);
//     } 
//     else {
//             Medicine.deleteOne({Med_id: request.params.Med_id}).then((result)=>{
//                 response.status(201).json({ message: 'Deleted' })
//             }).catch((error)=>{
//                 error.status=500;
//                 next(error)
//             })    
//     }
 
// }

exports.deleteMedicine= async (request, response, next) => {
    try {
        let data = await Medicine.deleteOne({Med_id: request.params.id})
        if (data == null) throw new Error("Medicine Is not Found!")
        response.status(200).json({ message: "deleted" })
    } catch (error) {
        next(error);    
    }

}