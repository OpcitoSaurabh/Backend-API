const mongoose =require("mongoose");

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the User name"]
    },
    email:{
        type:String,
        required:[true,"Please add the Email Address"],
        unique:[true,"This Email is already Register"]
    },
    password:{
        type:String,
        required:[true,"Please add the User Password"]
    },
},{
    // timestamps will add 2 more field i.e "createdAt" and "updatedAt" which is time when you created and updated
    timestamps:true,
})

// Contacts will be the collection name of schema 
module.exports=mongoose.model("users",userSchema)