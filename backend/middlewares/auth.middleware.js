import jwt from 'jsonwebtoken'
import { User } from '../models/User.models.js';

const verifyJwT = async(req,res,next)=>{
    try{
      const token = req.cookies?.accessToken || 
      req.header("Authorization")?.split(" ")[1];

      if(!token)
      {
       return res.status(401).json({success:false,message:"Unauthorized request"});
      }

      const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decodedToken?._id).select(
        "-password -refresToken"
      )

      if(!user)
      {
        res.status(401).json({success:false,message:"Invalid token"});
      }

      req.user = user;
      next();
    }
    catch(error)
    {
        console.log("Error occured during verification",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export default verifyJwT;