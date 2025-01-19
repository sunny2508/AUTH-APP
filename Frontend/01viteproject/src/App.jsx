import React, { useEffect } from "react";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { Routes,Route, Navigate } from "react-router-dom";
import EmailVerificationpage from "./Pages/EmailVerificationpage";
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import LoadingSpinner from "./Components/LoadingSpinner";
import Profile from "./Pages/Profile";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import HomePage from "./Pages/HomePage";

import { useAuthStore } from "./Store/authstore";

axios.defaults.baseURL = 'http://localhost:3000/api/auth';
axios.defaults.withCredentials = true;

const ProtectedRoute = ({children})=>{

   const {isAuthenticated,user} = useAuthStore();

   if(!isAuthenticated)
   {
    return  <Navigate to='/login' replace/>
   }

   if(!user.isVerified)
   {
    return <Navigate to='/verify-email' replace/>
   }

   return children
}

const RedirectAuthenticatedUser = ({children})=>{

  const {isAuthenticated,user} = useAuthStore();

  if(isAuthenticated && user.isVerified)
  {
    return <Navigate to={'/profile'} replace/>
  }

  return children
} 

function App()
{
   const {checkAuth,isCheckingAuth} = useAuthStore();

   useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner/>

  return(
    <div className="bg-[#754043] h-screen w-screen flex justify-center
    items-center">
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/profile' element={<ProtectedRoute>
        <Profile/>
      </ProtectedRoute>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<RedirectAuthenticatedUser>
        <Login/>
      </RedirectAuthenticatedUser>}/>
      <Route path='/verify-email' element={<EmailVerificationpage/>}/>
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
        <ForgotPasswordPage/>
      </RedirectAuthenticatedUser>}/>
      <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
        <ResetPasswordPage/>
      </RedirectAuthenticatedUser>}/>
     </Routes>
     <Toaster/>
    </div>
  )
}

export default App