import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("MongoDb connected successfully");
    }
    catch(error)
    {
        console.log("MongoDb connection failed",error.message);
        process.exit(1);
    }
}

export  default connectDB;