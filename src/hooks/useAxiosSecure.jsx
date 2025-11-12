import React, { useEffect } from 'react'
import { useAuth } from './useAuth'
import axios from 'axios';
const instance= axios.create({
  baseURL:"https://car-rental-backend-chi.vercel.app/"
})
export default function useAxiosSecure() {
  const {user}=useAuth();
  useEffect(()=>{
    const requestInterceptor= instance.interceptors.request.use(config=>{
    
      if(user?.accessToken){
         config.headers.authorization= `Bearer ${user.accessToken}`;
      }
      return config;
    })
  return ()=>{
    instance.interceptors.request.eject(requestInterceptor);
  };
    },[user]);
    return instance;
}
