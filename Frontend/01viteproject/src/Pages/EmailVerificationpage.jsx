import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../Store/authstore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const EmailVerificationpage = () => {

   const [code,setCode] = useState(["","","","","",""]);
   const inputRef = useRef([]);
   const navigate = useNavigate();

   const {error,isLoading,verify_email,} = useAuthStore()


   const handleChange = (index,value)=>{
      
      const newCode = [...code]

       //Handle pasted content

       if(value.length > 1)
       {
            const pastedCode = value.slice(0,6).split("");

            for(let i=0;i<6;i++)
            {
              newCode[i] = pastedCode[i] || "";
            }

            setCode(newCode);

            //Focus on the last empty input or the first empty one

          const lastFilledIndex = newCode.findLastIndex((digit)=>digit !== "");
          const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
          inputRef.current[focusIndex].focus();
       }
       else{
             //if one by one value is filling
             newCode[index] = value;
             setCode(newCode);

             //focus on next input
             if(value && index<5)
             {
              inputRef.current[index+1].focus();
             }
       }
   }

   const handleKeyDown = (index,e)=>{
       
     if(e.key === "Backspace" && !code[index] && index>0 )
     {
       inputRef.current[index-1].focus();
     }
   }

  const handleSubmit = async (e)=>{
     e.preventDefault();
     const verificationCode = code.join("");
    try{
      await verify_email(verificationCode);
        navigate('/login');
      toast.success("Email verified successfully");

    }
    catch(error)
    {
      console.log(error);
    }

  }

  useEffect(()=>{
    if(code.every((digit)=>digit !== ""))
    {
      handleSubmit(new Event("submit"));
    }
  },[code])
  return (
    
    <div className='max-w-md w-full bg-[#9A8873] rounded-2xl
    overflow-hidden'>
        <div className='p-8'>
            <h2 className='text-center text-[#171614] 
            text-3xl font-bold mb-6'>Verify Your Email</h2>

            <p className='text-gray-950 text-center mb-6
            '>Enter the 6 digit code sent to your Email Address</p>

            <form onSubmit={handleSubmit} className='space-y-6'>
               <div className='flex justify-between'>
                {code.map((digit,index)=>(
                  <input
                  key={index}
                  ref={(el)=>inputRef.current[index] = el}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e)=>handleChange(index,e.target.value)}
                  onKeyDown={(e)=>handleKeyDown(index,e)}
                  className='size-12 text-center text-2xl rounded-md
                  bg-gray-700 text-white focus:bg-[#754043]
                  focus:outline-none  '/>
                ))}
               </div>
               
               {error&&<p className='text-red-700 mt-2'>{error}</p>}

               <button type='submit' className='w-full bg-[#754043]
               text-center font-bold text-2xl rounded-lg
               px-10 py-2 text-gray-950 focus:ring-2
               focus:ring-gray-800'
               disabled={isLoading || code.some((digit)=>!digit)}>
                {isLoading?"Verifying":"Verify Email"}
               </button>
            </form>
        </div>
        
    </div>
  )
}

export default EmailVerificationpage