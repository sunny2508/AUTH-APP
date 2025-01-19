import React, { useState } from 'react'
import Input from '../Components/Input';
import {Lock, Mail, Loader,User, Eye, EyeOff} from 'lucide-react'
import {Link,useNavigate} from 'react-router-dom'
import PasswordStrengthMeter from '../Components/PasswordStrengthMeter';
import { useAuthStore } from '../Store/authstore';


const Signup = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {signup,error,isLoading} = useAuthStore();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
          await signup(name,email,password);
           navigate('/verify-email')
        }
        catch(error)
        {
          console.log(error);
        }
    }

    const togglePasswordVisibility = ()=>{
      setShowPassword((prev)=>!prev)
    }
    
  return (
    <div className='max-w-md w-full bg-[#9A8873] rounded-2xl
     overflow-hidden'>
      <div className='p-8'>
        <h2 className='text-center text-3xl text-[#171614] font-bold mb-6'>CREATE ACCOUNT</h2>
        
        <form onSubmit={handleSubmit}>
          <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}/>

          <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>

          <div className='relative'>
            
            <Input
            icon={Lock}
            type={showPassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>

            <button
            type="button"
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 pr-2 flex items-center'>
              {showPassword ? <EyeOff/> : <Eye/>}
            </button>
          </div>

          {error && <p className='text-red-700
          mt-2'>{error}</p>}

          <PasswordStrengthMeter password={password}/>

          <button type="submit" className='bg-[#754043]
          text-center text-gray-950 font-bold w-full px-10 
          py-2 rounded-lg mt-2 hover:bg-red-950 text-xl'
          disabled={isLoading}>
            {isLoading? <Loader className=" size-6 animate-spin mx-auto"
            />:"SignUp"}
          </button>
        </form>
      </div>

      <div className='bg-[#171614] bg-opacity-50 px-8 py-2 flex 
      justify-center w-full'>
        <p className='text-sm text-gray-900 font-bold'>
          Already have an account?{" "}
          <Link to={'/login'} className='text-red-950 text-xl
          hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup