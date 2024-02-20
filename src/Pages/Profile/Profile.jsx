import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "@firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { app } from "../../../firebase.config";
import UseAxiosSource from "../Hooks/UseAxiosSource";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate()
  const fileRef = useRef(null);
    const params = useParams();
    // console.log(params);

    const{user,logOut}=useContext(AuthContext);
    const [axiosSecure]= UseAxiosSource();

    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
  
      const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
          },
          (error) => {
            setFileUploadError(true,error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, photoURL: downloadURL })
            );
          }
        );
      };
  
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
            setCurrentUser(data);
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

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        setLoading(true);
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success === false) {
          setError(data.message);
          setLoading(false);
            return;
          }
    
          setUpdateSuccess(true);
        } catch (error) {
         setError(error.message)
        }
      };

      

    return (
        <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={user.PhotoURL || currentUser.photoURL}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.name}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
    );
};

export default Profile;