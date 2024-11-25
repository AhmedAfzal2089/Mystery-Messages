/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import {User} from "next-auth"
import { Button } from './ui/button'

const Navbar = () => {
    const {data:session} = useSession() // this session only gives that the user is active or not

    const user:User = session?.user as User
    
  return (
   <nav className='p-4 md:p-3 shadow-md' > 
    <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a className='text-xl font-bold mb-4 md:mb-0' href="">Mystery Message</a>
        {
            session ? 
            (<>
            <span className='mr-4 '>Welcome, {user?.username || user?.email}</span>
            <Button className='w-full md:w-auto' onClick={()=> signOut()}>Logout</Button>
            </>
            
            ):
            (<Link href={'/sign-in'}><Button className='w-full md:w-auto'>Login</Button></Link> )
        }
    </div>
   </nav>
  )
}

export default Navbar
