import { AuthRequiredError } from '@/app/lib/AuthRequirdError'
import React from 'react'
let session = null
const Login = () => {
 
  if(!session) throw new AuthRequiredError('You need to ensure, you are authorized')
  return (
    <div>This is Login page</div>
  )
}

export default Login