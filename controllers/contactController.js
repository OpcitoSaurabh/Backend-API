// Note: because express-async-handler lib. you dont need to write try catch for error handling
// imports 
// importing async handler from express-async-handler lib. 
const asyncHandler = require("express-async-handler")
const Contacts = require("../models/contactModel")
// setting all routes here

// @desc Get all contacts
// @route Get api/contacts
// @access private

const getContact=asyncHandler(async(req,resp)=>{
    const contacts = await Contacts.find({user_id:req.user.id});
    resp.status(200).json(contacts)
})

// @desc Post contact
// @route Post api/contacts
// @access private
const postContact=asyncHandler(async(req,resp)=>{
    console.log("req.body",req.body);
    const {name, email, phone}=req.body;
    // if req.body dont have any above field thorw err
    if(!name||!email|!phone){
        resp.status(400);
        throw new Error("All fields are mendatory");
    }
    const contact = await Contacts.create({name,email,phone,user_id:req.user.id})
    resp.status(201).json(contact)
})
// @desc Put contact
// @route Put api/contacts/:id
// @access private
const putContact=asyncHandler(async(req,resp)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        resp.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        resp.status(404);
        throw new Error("You dont have access to update this contact");
    }
    const updateContact = await Contacts.findByIdAndUpdate(
        req.params.id, req.body,{new:true}
    ) 
    resp.status(200).json(updateContact)
})
// @desc Get single contact
// @route Get api/contacts/:id
// @access private
const getSingleContact=asyncHandler(async(req,resp)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        resp.status(404);
        throw new Error("Contact Not Found");
    }
    resp.status(200).json(contact)
})
// @desc Delete contact
// @route Delete api/contacts/:id
// @access private
const deleteContact=asyncHandler(async(req,resp)=>{
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        resp.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        resp.status(404);
        throw new Error("You dont have access to delete this contact");
    }
    await  Contacts.deleteOne({_id:req.params.id});
    resp.status(200).json(contact)
})

module.exports={getContact, postContact, putContact, deleteContact, getSingleContact}