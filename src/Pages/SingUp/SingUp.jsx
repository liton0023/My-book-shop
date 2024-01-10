import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import SocialLogin from '../LogIn/SocialLogin/SocialLogin';

const SingUp = () => {

    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);

    const onSubmit =data=>{
        console.log(data);
        createUser(data.email, data.password)
        .then((result)=>{
            const loggedUser =result.user;
            // console.log(loggedUser)
            updateUser(data.name , data.photo)
            .then(()=>{
                const saveUser= {name: data.name ,email: data.email}
                fetch('http://localhost:5000/users',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify(saveUser),
                })
                .then((res)=>res.json())
                .then((data)=>{
                    reset();

                    console.log('user profile info updated')
                    if(data.insertedId){
                        alert('user added successfully')
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
                  type="text"
                  {...register(
                    "photo",
                    { required: true },
                    { pattern: /^[A-Za-z]+$/i }
                  )}
                  name="photo"
                  placeholder="Photo Url"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-600">
                    Photo Url field is required
                  </span>
                )}
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