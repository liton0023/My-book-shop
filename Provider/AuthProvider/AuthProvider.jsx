import axios from "axios";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
import { app } from "../../firebase.config";

export const AuthContext =createContext(null);
const auth = getAuth(app)
const AuthProvider = ({children}) => {
 const [user, setUser]=useState(null)
 const [loading , setLoading] =useState(true);
//  console.log(user);

 const googleProvider = new GoogleAuthProvider();
 const createUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
 };

 const singIn =(email ,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email ,password);
 }

 const logOut =()=>{
   setLoading(true);
   return signOut(auth);
 }

 const updateUser = (name ,photo)=>{
    return updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:photo,
    });
 };

 const googleSingin = ()=>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider)

 }

 useEffect(()=>{
    const unsuscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        // setLoading(false);

        if(currentUser){
            axios.post('https://books-server-2.onrender.com/jwt',{
                email:currentUser.email
            })
            .then(data=>{
                localStorage.setItem('access-token',data.data.token)
                setLoading(false);
            })
        }
        else{
            localStorage.removeItem('access-token')
        }
    });
    return ()=>{
         unsuscribe();
    }
 });

 const authInfo={
    user,
    loading,
    createUser,
    singIn,
    logOut,
    updateUser,
    googleSingin
    
 }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;