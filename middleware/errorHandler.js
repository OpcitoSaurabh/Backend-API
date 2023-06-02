// imports
const {constants} =require("../constants")


const errorHandler = (err,req,resp,next)=>{
const statusCode = resp.statusCode?resp.statusCode:500;
switch(statusCode){
    case constants.VALIDATION_ERROR:
        resp.json({title:"Validation Failed",message:err.message,stackTrace:err.stack});
        break;
    case constants.NOT_FOUND:    
        resp.json({title:"Not Found",message:err.message,stackTrace:err.stack});
        break;
    case constants.UNAUTHORIZED:    
        resp.json({title:"Unauthorized",message:err.message,stackTrace:err.stack});
        break;
    case constants.FORBIDDEN:    
        resp.json({title:"Forbidden",message:err.message,stackTrace:err.stack});
        break;
    case constants.SERVER_ERROR:    
        resp.json({title:"Server Not Found",message:err.message,stackTrace:err.stack});
        break;
    default:
        console.log("No Error all good!")
        break;
}

}
module.exports=errorHandler;