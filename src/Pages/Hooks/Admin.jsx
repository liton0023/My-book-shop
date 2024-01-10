import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import { UseAxiosSource } from '../Hooks/UseAxiosSource';
const Admin = () => {
    const {user}=useContext(AuthContext);
    const [axiosSecure]= UseAxiosSource();
    
    return (
        <div>
            
        </div>
    );
};

export default Admin;