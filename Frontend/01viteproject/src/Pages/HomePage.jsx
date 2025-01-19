import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate();

    const handleSignup = ()=>{
        navigate("/signup")
    }

    const handleLogin = ()=>{
        navigate("/login")
    }
  return (
    <div className='flex justify-center flex-col items-center
     '>
        <h1 className='text-5xl text-gray-400 mb-6 
        bg-[#171614] rounded-lg p-6 '>Welcome to My Application</h1>
        <div className='flex justify-center flex-col mb-6'>
            <h2 className='text-2xl text-gray-400 mb-4'>Go to Signup Page</h2>
            <button onClick={handleSignup} className='rounded-lg
            text-center bg-[#9A8873] font-bold text-xl px-10 py-2 ' >Sign UP</button>
        </div>

        <div className='flex justify-center flex-col mb-6'>
            <h2 className='text-2xl text-gray-400 mb-4'>Go to Login Page</h2>
            <button onClick={handleLogin} className='rounded-lg 
            text-center bg-[#9A8873] font-bold text-xl px-10 py-2'>Login</button>
        </div>
    </div>
  )
}

export default HomePage