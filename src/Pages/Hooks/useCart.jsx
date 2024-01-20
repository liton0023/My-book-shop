import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import UseAxiosSource from './UseAxiosSource';
const useCart = () => {
    const {user ,loading} = useContext(AuthContext);
    // console.log(user)
    const [axiosSecure] = UseAxiosSource();
    const {refetch,data: cart=[]} = useQuery({

        queryKey:['carts', user?.email],
        enabled:!loading,
        queryFn : async()=>{
            const res = await axiosSecure(`carts?email=${user.email}`)
            // console.log(res)
            return res.data;
        }
    })
    return [cart ,refetch]
};

export default useCart;