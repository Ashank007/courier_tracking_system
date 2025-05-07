import jwt from "jsonwebtoken"
import HandleError from "../utils/ApiError.js";
import HandleResponse from "../utils/ApiResponse.js";

const isauthenticated = async(req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        if(!token){
           return HandleResponse(res,false,"Token Not Found",400);
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
	if(!decoded) return HandleResponse(res,false,"Login First",404) 
        req.user = decoded;
        next();
    } catch (error) {
       HandleError(res,false,error.message,500);
    }
}
export default isauthenticated;
