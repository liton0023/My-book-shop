import React, { useContext } from 'react';
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Provider/AuthProvider/AuthProvider';

const SocialLogin = () => {
const {googleSingin}=useContext(AuthContext);
const navigte =useNavigate();
const location =useLocation();

const from = location.state?.from?.pathname || "/";

const handleGoogleSingin =()=>{
    googleSingin()
    .then((result)=>{
        const loggedUser =result.user;
        console.log(loggedUser);
        const saveUser ={name: loggedUser.displayName,email: loggedUser.email};
        fetch('http://localhost:5000/users',{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify(saveUser)
        })
        .then((res)=>res.json())
        .then(()=>{
            navigte(from,{replace:true});
        });
    });
}

    return (
        <div>
           <div className="divider"></div>
      <div className="text-center">
        <button
          onClick={handleGoogleSingin}
          className="btn btn-circle btn-outline"
        >
          <FaGoogle></FaGoogle>
        </button>
        <button className="btn btn-circle mx-4 btn-outline">
          <FaFacebook></FaFacebook>
        </button>
      </div> 
        </div>
    );
};

export default SocialLogin;