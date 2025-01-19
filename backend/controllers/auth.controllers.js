import { User } from "../models/User.models.js";
import crypto from "crypto"
import { sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail
 } from "../Mailtrap/email.js";

 const generateAccessandRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
    }
    catch(error)
    {
        console.log("Error in generating token",error);
        throw new Error(`Error in generating token ${error}`);
    }
 }

const signUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password)
        {
            throw new Error("All fields are required");
        }

        const existedUser = await User.findOne({email});

        if(existedUser)
        {
           return res.status(409).json({success:false,message:"User already exist"});
        }

        const verificationToken = Math.floor(100000 + Math.random() *900000).toString();

        const user = await User.create({
            name,
            email,
            password,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24*60*60*1000//24hours
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser)
        {
            res.status(500).json({success:false,message:"Error occured while registering user"});
        }

       await sendVerificationEmail(createdUser.email,verificationToken);

        res.status(201)
        .json({success:true,data:createdUser,message:"User registered successfully"});
    }
    catch(error)
    {
      res.status(400).json({success:false,message:error.message});
    }
}

const verifyEmail = async(req,res)=>{
    try{
        const {code} = req.body;

        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })

        if(!user)
        {
          return res.status(400).json({success:false,message:"Invalid or expired verification code"})
        }

       user.isVerified=true;
       user.verificationToken=undefined;
       user.verificationTokenExpiresAt=undefined;

       await user.save({validateBeforeSave:false});

       await sendWelcomeEmail(user.email,user.name);

       const verifiedUser = await User.findById(user._id).select(
        "-password -refreshToken"
       );

       res.status(200)
       .json({success:true,message:"Email verified successfully",
        data:verifiedUser
       });
    }
    catch(error)
    {
        console.log("Error in verifying email",error);
        res.status(500).json({success:false,message:"Server error"});
    }
}

const login = async(req,res)=>{
    try{
        const{email,password} = req.body;

        if(!email || !password)
        {
            throw new Error("All fields are required");
        }

        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(404).json({success:false,message:"User does not exist"});
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if(!isPasswordValid)
        {
            return res.status(401)
            .json({success:false,message:"Invalid credentials"});
        }

       const{accessToken,refreshToken} = await
        generateAccessandRefreshToken(user._id);


        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly:true
        }

        res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({success:true,data:loggedInUser,
            message:"User logged in successfully"
        })

    }
    catch(error)
    {
        console.log("Error in logging in",error);
        res.status(400).json({success:false,message:error.message});
    }
}

const logout = async(req,res)=>{
  
   try{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{refreshToken:undefined}
        },
        {
            new:true,
        }
       )
    
       const options={
        httpOnly:true
       }
    
       res.status(200)
       .clearCookie("accessToken",options)
       .clearCookie("refreshToken",options)
       .json({success:true,message:"User logged out successfully"});
   }
   catch(error)
   {
    console.log("Error in logging out",error);
    res.status(500).json({success:false,message:"Error in logging out"});
   }
}

const forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email})

        if(!user)
        {
            res.status(409).json({success:false,message:"User does not exist"})
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 *60*60 *1000//1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save({validateBeforeSave:false});

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({success:true,message:"Password reset email sent successfully"});
    }
    catch(error)
    {
        console.log("Error in forgot password",error);
       res.status(500).json({success:false,message:error.message});
    }
}

const resetPassword = async(req,res)=>{
    try{
        const {token} = req.params;
        const {newPassword} = req.body;

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()}
        })

        if(!user)
        {
            return res.status(409).json({success:false,message:"Invalid or expired reset token"});
        }
        
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save({validateBeforeSave:false});

        await sendResetSuccessEmail(user.email);

       res.status(200)
       .json({success:true,message:"Password reset successfully"});
    }
    catch(error)
    {
        console.log("Error in reset password",error);
       res.status(500).json({success:false,message:error.message})
    }
}

const checkAuth = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select(
            "-password -refreshToken"
        );

        if(!user)
        {
            res.status(409).json({success:false,message:"User not found"});
        }

        res.status(200).json({success:true,data:user});
    }
    catch(error)
    {
        console.log("Error in check Auth",error);
        res.status(400).json({success:false,message:error.message});
    }
}
export {signUp
    ,  verifyEmail,
       login,
       logout,
       forgotPassword,
       resetPassword,
       checkAuth
}