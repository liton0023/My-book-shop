import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import SocialLogin from './SocialLogin/SocialLogin';

const LogIn = () => {
    const {singIn}=useContext(AuthContext);
    const navigate =useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit =(e)=>{
        e.preventDefault();
        const form=e.target;
        const email =form.email.value;
        const password =form.password.value;
        console.log(email,password);

        singIn(email,password)
        .then((result)=>{
            const user =result.user;
            console.log(user);
            Swal.fire({
                title: "User LogIn Successfully!",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
              navigate(from, { replace: true });
        })

    }
    return (
        <>
          <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-2/3 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="text-center">
                <small>
                  <Link to="/singup">Now Here? Create An Account</Link>
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

export default LogIn;