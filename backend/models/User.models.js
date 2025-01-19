import mongoose,{Schema} from "mongoose";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    lastLogin:{
        type:Date,
        default:Date.now
    },

    refreshToken:{
        type:String
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true})



UserSchema.pre("save",async function(next){
    
    if(!this.isModified('password'))
    {
        return next();
    }

    this.password = await bcryptjs.hash(this.password,10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password){
    return await bcryptjs.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function()
{
    return jwt.sign(
        {
            _id:this._id,
            name:this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function()
{
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User',UserSchema);