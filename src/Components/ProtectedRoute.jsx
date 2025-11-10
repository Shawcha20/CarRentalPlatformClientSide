import React from 'react'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({children}) {
    const {user}=useAuth();
  
              
    
  return (
    <div>ProtectedRoute</div>
  )
}
