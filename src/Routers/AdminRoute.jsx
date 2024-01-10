import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider/AuthProvider';
import Admin from '../Pages/Hooks/Admin';

const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location =useLocation();
    
    const [isAdmin, isAdminLoading]=Admin();


    if(loading  || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
      return children;
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default AdminRoute;