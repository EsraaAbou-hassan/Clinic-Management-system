const express =require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const medicineRouter = require("./Routes/medicineRoute");



const server=express();

//1- openinign DB Connection & node server
mongoose.connect("mongodb://localhost:27017/CMS")
        .then(()=>{
                console.log("DB Connected");
                server.listen(process.env.PORT||8070,()=>{
                    console.log("I am listening ......")
                });
                
        })
        .catch(error=>{
                console.log("DB Conection Problem");

        });



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

// we will put our Routing here 
server.use("/medicine",medicineRouter);
// patient,doctor ,......


server.use((request,response,next)=>{
        response.send("General Middle ware");

});

//------------------------- Error MW
server.use((error,request,response,next)=>{
    error.status=error.status || 500;
    response.status(error.status).send("Error Page "+ error);

})
