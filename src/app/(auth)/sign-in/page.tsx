/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import *as z  from "zod" // it will import all the exports in this app
import Link from "next/link"
import { useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"


const SignIn = () => {
  const{toast}= useToast()
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceValue(username,300) //to check the username is available or not to reduce the server load
  return (
    <div>
      
    </div>
  )
}

export default SignIn
