import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';

const axiosSecure =axios.create({
    baseURL:"http://localhost:5000/"
});

const UseAxiosSource = () => {
    const {singOut} =useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('access-token')
            if(token){
                config.headers.Authorization = `Bearer ${token}`

            }
            return config;
        })
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
              if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
              ) {
                await singOut();
                navigate("/login");
              }
              return Promise.reject(error);
            }
          );
        }, [singOut, navigate]);
      
        return [axiosSecure];
};

export default UseAxiosSource;