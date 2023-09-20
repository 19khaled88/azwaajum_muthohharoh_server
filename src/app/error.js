"use client";

import Link from "next/link";

const Error = ({error, reset}) => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">401</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Unauthroized!
        </p>

        <p className="mt-4 text-gray-500">
          {error.message || 'Something wrong'}
        </p>

        <button
        onClick={()=>reset()}
          type="button"
          className="inline-block px-5 py-3 mt-6 mr-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Try Again
        </button>
        <Link href='/' className='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-emerald-400 rounded hover:bg-emerald-500 focus:outline-none focus:ring'>Go back home</Link>
      </div>
    </div>
  )
}

export default Error