import jwt from "jsonwebtoken"
import User from "../model/UserModel.js";

const ProtectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(400).json({message:"unAuthorized"});
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.userId).select("-password");
        req.user=user;
        next();
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
		console.log("Error: ", error.message);
    }
}
export default ProtectRoute;