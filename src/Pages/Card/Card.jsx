import { useContext } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import useCart from '../Hooks/useCart';

const Card = ({item}) => {
 const navigate =useNavigate();
 const location = useLocation();
 const {user}= useContext(AuthContext);
 const[,refetch] = useCart();
  // console.log(item.name);
 

  const handleAddToCart =(item)=>{
    const {_id,name ,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer}=item;
    console.log(item)
    if(user && user.email){
      const orderItem ={menuItemId : _id,name:name,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer, email: user.email}
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

      <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`books/${item._id}`}>
        <img
          src={
            item.imgUrl ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {item.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {item.writer}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {item.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
         Price : $
            {item.offer
              ? item.discountPrice
              : item.regularPrice}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {item.stock> 1
                ? `${item.stock} books `
                : `${item.stock} book`}
            </div>
            <div className='font-bold text-xs'>
              {item.stock > 1
                ? `${item.stock} books `
                : `${item.stock} book `}
            </div>
          </div>
        </div>
      </Link>
      <div className="card-actions">
          <button
              onClick={() => handleAddToCart(item)}
              className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
              ADD TO CART
            </button>
          </div>
    </div>
    );
};

export default Card;