/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Models/User";

export async function POST(request:Request) {
    await dbConnect()
    try {
        const  {username, code} =  await request.json()
        // when data coming from url , decode it by using decodeURIComponent
        const decodedUsername =decodeURIComponent(username)
       const user= await UserModel.findOne({username:decodedUsername})
       if(!user){
        return Response.json({
            success:false,
            message:"user not verified"
        },{status:500})
       }
       const isCodeValid = user.verifyCode === code
       const isCodNotExpired = new Date(user.verifyCode) > new Date() // Database data should be more then the new code

       // if user entered correct code and code is not expired
       if(isCodeValid &&isCodNotExpired){
        user.isVerified= true
        await user.save()
        return Response.json({
            success:true,
            message:"Account verified successfully"
        },{status:200}
        )
       }
       // if code expired
       else if(!isCodNotExpired){
        return Response.json({
            success:false,
            message:"Verification code has expired please signup again to get new verification code"
        },{status:300})
       }
       // if user entered the incorrect code
       else{
        return Response.json({
            success:false,
            message:"Incorrect verification code"
        },{status:500})
       }

    } catch (error) {
        console.error("Error Verifying User",error)
        return Response.json({
            success:false,
            message:"Error verifying user"
        },{status:500})
    }
}