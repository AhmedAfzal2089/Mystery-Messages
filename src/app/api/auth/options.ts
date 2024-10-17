/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import User from "@/Models/User";
import UserModel from "@/Models/User";

export const authOptions : NextAuthOptions ={
    providers :[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: { label: "Email", type: "text" },
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        //OR is used to check if the user is logging in with email and password
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("No user find with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login")
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user //this return is giving user to the provider which is given to authOptions
                    }else{
                        throw new Error("Incorrect Pasword")
                    }
                    
                } catch (err:any) {
                    throw new Error(err)
                    
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified= user.isVerified;
                token.isAcceptingMessages=user.isAcceptingMessages;
                token.username=user.username
            }
          return token
        },
        async session({ session,token }) {
            if(token){
                session.user._id=token._id
                session.user.isVerified=token.isVerified;
                session.user.isAcceptingMessages=token.isAcceptingMessages;
                session.user.username = token.username
            }
            return session
          },
    },
    pages:{
         signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}