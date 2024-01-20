import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import useCart from '../Hooks/useCart';

const Card = ({item}) => {
 const navigate =useNavigate();
 const location = useLocation();
 const {user}= useContext(AuthContext);
 const[,refetch] = useCart();
  // console.log(item.name);
  const {_id,name,imgUrl,price,category,wirter}=item;

  const handleAddToCart =(item)=>{
    console.log(item)
    if(user && user.email){
      const orderItem ={menuItemId :_id,name:name,category,imgUrl,price, email: user.email};
      fetch('http://localhost:5000/carts',{
        method: 'POST',
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify(orderItem)
      })
      .then((res)=> res.json())
      .then((data)=>{
        // console.log(data);
        if(data.insertedId){
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

        }
      })
    }
    else {
      Swal.fire({
        title: "Pleace Login?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  }

    return (
      <div>
      <div className="card w-96 my-4 mx-auto h-[541px] bg-base-100 shadow-xl">
        <figure>
          <img src={imgUrl} alt="" className="rounded-xl" />
        </figure>
        <p className="absolute right-0 mr-4 mt-4 w-1/6 px-4 bg-slate-900 text-white">
          ${price}
        </p>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{wirter}</p>
          <div className="card-actions">
            <button
              onClick={() => handleAddToCart(item)}
              className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;