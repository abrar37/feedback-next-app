"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'

function Navbar() {
  const {data: session} = useSession()
  const user : User = session?.user as User

  return (
    <header>
      <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link href='/' className="text-xl font-bold mb-4 md:mb-0">Anonymous Feedback</Link>
          {
            session ? 
            (<>
                <span className="mr-4">Welcome, {user?.username || user?.email}</span> 
                <Button onClick={() => signOut} className="w-full md:w-auto bg-slate-100 text-black" variant="outline">
                  Log out
                </Button>
            </>
            ) : (
            <div className="flex gap-4">
              <Link href={'/u/abrar'}>
                <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>
                  Feedback
                </Button>
              </Link>

              <Link href={'/sign-in'}>
                <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>
                  Sign up
                </Button>
              </Link>
            </div>
            )
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar