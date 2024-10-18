/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request: Request){
    // if user use any other method than GET then NEXTJS doesn't allow
    
    await dbConnect()
    // taking url and destructuring the username from the url
    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        } // zod syntax
        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        // after consoling this result it have so many options 
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message: usernameErrors?.length>0 ? usernameErrors.join(',') : "Invalid query parameters" // all errors will join if error comes
            },{status:400})
        }
        const {username} = result.data
        //checking if existing verified user 
       const existingVerifiedUser= await UserModel.findOne({username, isVerified:true})
       if(existingVerifiedUser){
        return Response.json({
            success:false,
            message:"Username already exists "
        },{status:400})
       }
       // if no user found then return success
       return Response.json({
        success:true,
        message:"Username is available"
       })
    } catch (error) {
        console.error("Error checking username",error)
        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
    }
}