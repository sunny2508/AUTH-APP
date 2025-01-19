import React, { useEffect, useState } from 'react'
import { Mail,Loader,Lock,Eye,EyeOff } from 'lucide-react'
import { Link,useNavigate} from 'react-router-dom'
import Input from '../Components/Input'
import { useAuthStore } from '../Store/authstore'

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);


  const {isLoading,error,login,clearError} = useAuthStore();

  const handleLogin = async (e)=>{
    e.preventDefault();
  
    try{
      await login(email,password);
    }
    catch(error)
    {
      console.log(error);
    }

  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(()=>{
    return()=>{
      clearError();
    }
  },[clearError]);

  
  return (
    <div className='max-w-md w-full bg-[#9A8873] rounded-2xl
    overflow-hidden '>
      <div className='p-8'>
        <h2 className='text-center text-3xl text-[#171614] 
        font-bold mb-6'>Welcome Back</h2>
        
        <form onSubmit={handleLogin}>
          <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}/>

<div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? 'text' : 'password'} // Change input type based on visibility state
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Toggle button for show/hide password */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff /> : <Eye />} 
            </button>
          </div>
          
          <div className='mb-4'>
            <Link to={'/forgot-password'} className='text-red-950
            hover:underline '>Forgot Password?</Link>
          </div>

          {error && <p className='text-red-700 mt-2 '>{error}</p>}

          <button type="submit" className='bg-[#754043]
          text-center text-gray-950 font-bold w-full px-10 
          py-2 rounded-lg mt-2 hover:bg-red-950 text-xl'
          disabled={isLoading}>
            {isLoading ? <Loader className='size-6 animate-spin
            mx-auto'/>:"Login"}
          </button>
        </form>
      </div>

      <div className='bg-[#171614] bg-opacity-50 px-8 py-2 flex 
      justify-center w-full'>
        <p className='text-sm text-gray-900 font-bold'>
          Don't have an Account?{" "}
          <Link to={'/signup'} className='text-red-950 text-xl
          hover:underline'>SignUp</Link>
        </p>
      </div>
    </div>
  )
}

export default Login




{/* <Input
          icon={Lock}
          type="password"
          placeholder="Passoword"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          /> */}
