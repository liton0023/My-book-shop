import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import UseAxiosSource from "../Hooks/UseAxiosSource";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    // console.log(params);

    const{user,logOut}=useContext(AuthContext);
    const [axiosSecure]= UseAxiosSource();
  
    useEffect(() => {
        const fetchUser = async () => {
          try {
            setLoading(true);
            const res = await axiosSecure(`users/${params.email}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setProfile(data);
            console.log(data);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchUser();
      }, [params.email]);

    return (
        <div>
        </div>
    );
};

export default Profile;