/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"; // it will import all the exports in this app
import Link from "next/link";
import {useState } from "react";
import { useDebounceValue,useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  //zod implemetation
  const form = useForm<z.infer<typeof signInSchema>>({
    //useform will follow this schema
    resolver: zodResolver(signInSchema), // the resolver requires a schema
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
       redirect:false,
       identifier: data.identifier,
       password:data.password
    })
    if(result?.error){
      if(result?.error =="CredentialsSignin"){
        toast({
          title:"Login Failed",
          description:"Incorrect username or password",
          variant:"destructive"
        })
      }else{
        toast({
          title:"Error",
          description:result.error,
          variant:"destructive"
        })
      }
    }
    if(result?.url){
      router.replace('/dashboard')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password </FormLabel>
                  <FormControl>
                    {/* it will take the field automatically and fit in form  */}
                    <Input type="password" placeholder="Enter your Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              SignIn
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            New to App? { ''}
            <Link href='/sign-up'  className="text-blue-600 hover:text-blue-800>">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
