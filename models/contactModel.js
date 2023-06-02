const mongoose =require("mongoose");

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add the Email Address"]
    },
    phone:{
        type:String,
        required:[true,"Please add the Phone Number"]
    },
},{
    // timestamps will add 2 more field i.e "createdAt" and "updatedAt" which is time when you created and updated
    timestamps:true,
})

// Contacts will be the collection name of schema 
module.exports=mongoose.model("Contacts",contactSchema)