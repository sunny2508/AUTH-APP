import {create} from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set)=>(
    {
        user:null,
        isAuthenticated:false,
        error:null,
        isLoading:false,
        isCheckingAuth:false,
        message:null,

        signup:async(name,email,password)=>{
            set({isLoading:true,error:null})

            try{
                const response = await axios.post('/signup',{name,email,password})
                if(response.status === 201 )
                {
                    set({user:response.data.data,isLoading:false});
                }
            }
            catch(error)
            {
                set({error:error.response.data.message || "Error in signing up"
                    ,isLoading:false});
                throw error;
            }
        },

        login:async(email,password)=>{

            set({isLoading:true,error:null});

            try{
                const response = await axios.post('/login',{email,password})

                if(response.status === 200)
                {
                    set({user:response.data.data,isAuthenticated:true
                        ,isLoading:false})
                }
            }
            catch(error)
            {
                set({error:error.response.data.message || "Error in logging in",
                    isLoading:false,isAuthenticated:false
                })
                throw error;
            }
        },

        logout:async ()=>{
            set({isLoading:true,error:null});

            try{
                const response = await axios.post('/logout');
                if(response.status === 200)
                {
                    set({user:null,isAuthenticated:false,isLoading:false});
                }
            }
            catch(error)
            {
                set({error:error.response.data.message,isLoading:false});
                throw error;
            }
        },

        verify_email: async(code)=>{
            set({isLoading:true,error:null});
            try{
                const response = await axios.post('/verify-email',{code});
                if(response.status === 200)
                {
                    set({user:response.data.data,isLoading:false});
                    return response.data
                }
                
            }
            catch(error)
            {
                set({error:error.response.data.message,isLoading:false});
                throw error;
            }
        },

        checkAuth:async()=>{
            set({isCheckingAuth:true,error:null});

            try{
                const response = await axios.get('/check-auth')

                if(response.status === 200)
                {
                    set({user:response.data.data,isAuthenticated:true,isCheckingAuth:false})
                }
            }
            catch(error)
            {
                set({error:null,isCheckingAuth:false,isAuthenticated:false})
                throw error;
            }
        },

        forgotPassword:async(email)=>{
            set({isLoading:true,error:null,message:null});

            try{
                const response = await axios.post('/forgot-password',{email})

                if(response.status === 200)
                {
                    set({message:response.data.message,isLoading:false});
                }
            }
            catch(error)
            {
                set({error:error.response.data.message || 
                    "Error occured in forgot password",isLoading:false});
                    throw error;
            }
        },

        resetPassword:async(token,newPassword)=>{
            set({isLoading:true,error:null,message:null});

            try{
                const response = await axios.post(`/reset-password/${token}`,{newPassword});
                if(response.status === 200)
                {
                    set({message:response.data.message,isLoading:false});
                }
            }
            catch(error)
            {
                set({error:error.response.data.message || 
                    "Error in resetting password",isLoading:false
                });
                throw error;
            }
        },

        clearError:()=>{
            set({error:null});
        },
    }
))