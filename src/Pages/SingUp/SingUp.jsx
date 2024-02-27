import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import { app } from '../../../firebase.config';
import SocialLogin from '../LogIn/SocialLogin/SocialLogin';

const SingUp = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);

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
            setFormData({ ...formData, profilePhoto: downloadURL })
          );
        }
      );
    };
  
    // console.log(formData.profilePhoto)

    const onSubmit =data=>{
        // console.log(data);
        createUser(data.email, data.password)
        .then((result)=>{
            const loggedUser =result.user;
            console.log(loggedUser)
            updateUser(data.name ,formData.photoURL)
            .then(()=>{
                const saveUser= {name: data.name ,email: data.email,photoURL:formData.profilePhoto,gender:data.gender,age:data.age}
                fetch('https://books-server-2.onrender.com/users',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify(saveUser),
                })
                .then((res)=>res.json())
                .then((data)=>{
                    console.log('user profile info updated',data);
                    if(data.insertedId){
                      reset();
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User  added successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }
                })
                navigate('/')
            })
            .catch((error)=> console.log(error));
        });
    }
    return (
        <>
          <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-2/3 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sing Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register(
                    "name",
                    { required: true },
                    { pattern: /^[A-Za-z]+$/i }
                  )}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
             
                <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          accept='image/*'
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
          )}</p>
              
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender Selection</span>
                </label>
                <select
                  className="input input-bordered"
                  {...register("gender")}
                >
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  name="age"
                  {...register("age", { required: true, min: 18, max: 99 })}
                />
                {errors.age && (
                  <span className="text-red-600">Age field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password is gather then 6 chackter
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password is lass then 20 chackter
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password is uppercase one lower case and one spacial
                    chackter
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sing Up"
                />
              </div>
              <p className="text-center">
                <small>
                  <Link to="/login">Already Registred? Go To Log In</Link>
                </small>
              </p>
              <SocialLogin></SocialLogin>
            </div>
          </form>
        </div>
      </div>  
        </>
    );
};

export default SingUp;