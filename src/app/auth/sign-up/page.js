'use client'
import React, { useState } from 'react'
import signUp from '../../firebase/auth/signup'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const handleForm = async (event) => {
    event.preventDefault()
    const { result, error } = await signUp(email, password)

    if (error) return error
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="m-auto form-wrapper border border-black-600">
        <h1 className="text-center text-2xl font-medium">Sign up</h1>
        <form onSubmit={handleForm} className="form p-2 flex flex-col drop-shadow-md">
          <label htmlFor="email">
            <p className='pb-1'>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='pl-2 pt-2 pb-2 mb-2'
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p className='pb-1'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              className='pl-2 pt-2 pb-2'
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit" className='bg-sky-400 mt-6 px-1 py-1 text-white hover:bg-blue-400'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
