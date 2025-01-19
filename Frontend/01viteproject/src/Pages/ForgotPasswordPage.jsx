import React, { useState } from 'react'
import { useAuthStore } from '../Store/authstore'
import Input from '../Components/Input';
import { Mail,Loader, ArrowBigLeft, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {

    const [email,setEmail] = useState('');
    const [isSubmitted,setisSubmitted] = useState(false);

    const {isLoading,forgotPassword} = useAuthStore();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            await forgotPassword(email);
            setisSubmitted(true);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
  return (
    <div className='max-w-md w-full rounded-2xl bg-[#9A8873] 
    overflow-hidden'>
        
        <div className='p-8' >
            <h2 className='text-center text-3xl text-[#171614]
            font-bold mb-6'>Forgot Password</h2>

            {!isSubmitted?(
                <form onSubmit={handleSubmit}>
                    <p className='text-center text-[#171614] 
                    text-xl mb-6'>
                        Enter your email address to recieve a link to 
                        reset your Password
                    </p>
                    <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>

                    <button type="submit" className='bg-[#754043]
                    rounded-lg text-center text-gray-950 
                    w-full px-10 py-2 focus:ring-2 focus:ring-gray-800
                    font-bold text-xl' disabled={isLoading} >
                    {isLoading? <Loader className='mx-auto animate-spin
                    size-6'/>:"Send Reset Link"}
                    </button>
                </form>
            ):(
                <div className='text-center'>
                    <div className='size-16 bg-[#754043] rounded-full
                   flex justify-center items-center mx-auto mb-4'>
                        <Mail className='size-8 text-white'/>
                    </div>
                    <p className='text-gray-950 text-xl'>
                        Please check your email for reset password link
                    </p>
                </div>
            )}
        </div>
        <div className='bg-gray-800 w-full bg-opacity-50 px-10 py-2 
        flex justify-center'>
            <Link to={'/login'} className='flex items-center font-bold text-xl' >
            <ArrowLeft className='size-6 mr-2'/>
            Back to Login
            </Link>
            
        </div>
    </div>
  )
}

export default ForgotPasswordPage