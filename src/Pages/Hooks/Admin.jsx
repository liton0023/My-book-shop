import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import UseAxiosSource from './UseAxiosSource';
const Admin = () => {
    const {user}=useContext(AuthContext);
    const [axiosSecure]= UseAxiosSource();

    const {data: isAdmin ,isLoading: isAdminLoading}=useQuery({
        queryKey:['isAdmin', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.admin;
        }
    })
    
   return [isAdmin ,isAdminLoading]
};

export default Admin;