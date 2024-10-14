import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 characters")
    .max(20,"Username must be no more than 20 characters")
    .regex(/^[a-zA-z0-9_]+$/,"Username must not contain speacial characters")


export const  signUpSchema = z.object({
    username:usernameValidation,
    email: z.string().email({message:"Invalid email adress"}),
    password:z.string().min(6,{message:"password must be atleast 6 characters"})
})