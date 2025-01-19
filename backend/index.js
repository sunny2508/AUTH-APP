import 'dotenv/config'
import connectDB from './db/database.js'
import {app} from './app.js'


const getConnection = async() =>{
    try{
        await connectDB();
        app.listen(process.env.PORT || 5000,()=>{
            console.log(`Server started at port ${process.env.PORT}`)
        })
    }
    catch(error)
    {
        console.log(`Server not started successfully`,error.message);
    }
}

getConnection();
 