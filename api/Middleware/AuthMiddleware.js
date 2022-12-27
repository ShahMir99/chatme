import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const Protected = async (req , res , next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,"mernstackdeveloper12345shahmirjutt");
            req.user = await User.findById(decoded._id)
            next()
        }catch(err){
            res.status(401).json("Unauthorized Request , Token Expire")
        }
    }else{
        res.status(401).json("Unauthorized Request , Token Expire")
    }
}