import React from 'react'
import { useAuthStore } from '../Store/authstore'
import { formatDate } from '../utils/formatDate';

const Profile = () => {

   const {user,logout} = useAuthStore();

   const handleLogout = async()=>{
    try{
      await logout();
    }
    catch(error)
    {
      console.log(error);
    }
   }
  return (
    
    <div className='max-w-md w-full bg-[#9A8873] rounded-2xl
     overflow-hidden mx-auto mt-10 p-8'>
        <h2 className='text-3xl text-center font-bold text-[#171614]
         mb-6'>Profile</h2>

         <div className='space-y-6'>
          <div className='bg-red-950 bg-opacity-60 p-4 
          rounded-lg '>
            <h3 className='text-xl font-semibold text-center
            text-gray-900 mb-6 '>Profile Information</h3>
            <p className='text-gray-950'>Name: {user.name}</p>
            <p className='text-gray-950'>Email: {user.email}</p>
          </div>

          <div className='bg-red-950 bg-opacity-60 p-4
          rounded-lg'>
            <h3 className='text-xl font-semibold text-center
            text-gray-900 mb-6'>Account Activity</h3>
            <p className='text-gray-950'>
              <span className='font-semibold'>Joined:</span>
              {new Date(user.createdAt).toLocaleString("en-US",{
                year:"numeric",
                month:"short",
                day:"numeric",
              })}
            </p>
            
            <p className='text-gray-950'>
              <span className='font-semibold'>Last Login:</span>
              {formatDate(user.lastLogin)}
            </p>
          </div>

          <button className='bg-[#754043] text-center text-2xl
          font-bold text-gray-950 w-full px-10 py-2 rounded-xl
          focus:ring-2 focus:ring-gray-800 ' onClick={handleLogout}
          >Logout</button>
         </div>
    </div>
  )
}

export default Profile