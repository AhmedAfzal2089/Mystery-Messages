import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?:number  // "?" means the connectionObject is optional
}

const connection :ConnectionObject={}
                    //type|^

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Database is already connected");
        return
    }
    try{
        const db =await mongoose.connect(process.env.MONGODB_URI ||"",{})
        connection.isConnected = db.connections[0].readyState
        console.log("DB connnected successfully ")
    }
    catch(error){
        console.log("Database connection failed", error);
        process.exit(1)
    }
}

export default dbConnect;