// imports
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// const 
const app =express();
// setting port from .env file using dotenv lib.
const port = process.env.PORT || 5000;

connectDb();

//passer for getting data from client to serverside 
app.use(express.json())
// setting routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// use of middleware that is error Handler
app.use(errorHandler);

// listing port for API's
app.listen(port,()=>{
    console.log(`port =${port}`)
})