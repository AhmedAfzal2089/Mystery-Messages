/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect()
    const session = await getServerSession(authOptions); //it will get the current logged in user
  const user: User = session?.user as User; //this is called asertion//its type is user which is coming from next-auth
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  // the type of userId is string now we are converting it in mongoose object so we dont get any errors 
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
        {$match:{id:userId}},
        {$unwind:'$messages'}, // from here we will get multiple document of messages ana now we can perform operations easily 
        {$sort:{'messages.createdAt':-1}},
        {$group:{_id:'$_id', messages:{$push:'messages'}}}
    ]) // the return from aggregation pipeline is an array
    if(!user || user.length === 0){
        return Response.json(
            {
              success: false,
              message: "User not  found",

            },
            { status: 401 }
          );
    }
    return Response.json(
        {
          success: true,
          message: user[0].messages, // the response from agg pipeline is an array an we are accessing first element of array
        },
        { status: 401 }
      );
  } catch (error) {
    console.log("An unexpected error occured", error)
    return Response.json(
        {
          success: false,
          message: "An unexpected error occured",

        },
        { status: 500 }
      );
  }

    
}