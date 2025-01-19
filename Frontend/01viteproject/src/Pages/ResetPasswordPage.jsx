import React, { useState } from 'react'
import Input from '../Components/Input'
import { useAuthStore } from '../Store/authstore';
import { Loader, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {

    const [newPassword,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const {isLoading,resetPassword} = useAuthStore();

    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(newPassword !== confirmPassword)
        {
            toast.error("Passwords do not match")
            return;
        }

        try{
            await resetPassword(token,newPassword);
            toast.success("Password reset successfully,Redirecting to login page");
            setTimeout(()=>(
                navigate('/login')
            ),2000);
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message || "Error in resetting Password");
        }
    }
    
  return (
    <div className='max-w-md w-full rounded-2xl bg-[#9A8873]
    overflow-hidden'>
        
        <div className='p-8'>
            <h2 className='text-center text-3xl text-[#171614]
            font-bold mb-6'>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <Input
                icon={Lock}
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>setPassword(e.target.value)}/>

                <Input
                icon={Lock}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <button type="submit" className='bg-[#754043]
                w-full text-xl text-center font-bold text-gray-950
                focus:ring-2 focus:ring-gray-700
                px-10 py-2 rounded-lg'
                disabled={isLoading}>
                    {isLoading?<Loader className='size-6 mx-auto
                    animate-spin'/>:"Reset Your Password"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default ResetPasswordPage