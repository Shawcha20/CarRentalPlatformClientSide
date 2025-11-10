import React, { useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import {auth} from "../Firebase/Firebase.init.js"
import { createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged,
     signInWithEmailAndPassword, 
     signInWithPopup, 
     signOut, 
     updateProfile } from 'firebase/auth'


const googleProvider= new GoogleAuthProvider(auth);

export default function AuthProvider({children}) {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    const UserSignOut=()=>{
        setLoading(true);
        return signOut(auth);
    }   
    const googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const UserLogin=(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const UserRegister=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const updateUserProfile = (name, photoURL) => {
    //console.log('Updating profile:', name, photoURL);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
 
  };
   useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>unsubscribe();
        
    },[])
    const authInfo={
        user,
        UserSignOut,
       googleLogin,
        UserLogin,
        UserRegister,
        loading, 
        updateUserProfile
    }
 


  return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
  )
}
