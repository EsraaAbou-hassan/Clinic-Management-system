const express =require("express");
var cors = require('cors')
const mongoose=require("mongoose");
const server=express();
const bodyParser=require("body-parser");
const medicineRouter = require("./Routes/medicineRoute");

const prescriptionRoute=require("./Routes/prescriptionRouter");
const invoiceRoute=require("./Routes/invoiceRouter");
const appointmentRouter=require("./Routes/AppointmentRouter")
const doctorRoute=require("./Routes/doctorRouter");
const authRouter=require('./Routes/authRouter');
const patientRouter=require('./Routes/patientRouter');
const doctorAppointmentRouter=require('./Routes/doctorAppointmentRouter');


// var fs = require('fs');
// var path = require('path');
// require('dotenv/config');

//1- openinign DB Connection & node server
mongoose.connect("mongodb://localhost:27017/CMS")
        .then(()=>{
                console.log("DB Connected");
                server.listen(process.env.PORT||8080,()=>{
                    console.log("I am listening ......")
                });
                
        })
        .catch(error=>{
                console.log("DB Conection Problem");

        });

 server.use(cors())
//************************* MiddleWares */
//first-MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

//----------------------------------------------------routing

server.use("/home",(request,response)=>{
    response.send("HOME PAGE");
});

// middle ware to handle reqestBody
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use(authRouter);

// we will put our Routing here 
server.use("/medicine",medicineRouter);
// patient,doctor ,......
server.use("/Prescription",prescriptionRoute);
server.use("/Invoice",invoiceRoute);
server.use("/Doctor",doctorRoute);
server.use("/doctorAppointment",doctorAppointmentRouter);
server.use("/patient",patientRouter);

//---------------------------------------------AppointmentRouter--------------------------------
server.use("/Appointment",appointmentRouter)


server.use((request,response,next)=>{
        response.send("General Middle ware");

});
//-----for image----
// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())
  
// server.set("view engine", "ejs");
// var multer = require('multer');
  
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });

server.use((req,res,nex)=>{
    res.send("unknown path")
})
//------------------------- Error MW
server.use((error,request,response,next)=>{
    error.status=error.status || 500;
    response.status(error.status).send("Error Page "+ error);

})

