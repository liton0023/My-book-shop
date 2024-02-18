
import { Helmet } from 'react-helmet-async';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../Hooks/useCart';

const MyCart = () => {
    const[cart,refetch] =useCart();
    // console.log(cart);
     const totals =cart.reduce((sum,item)=> item.price +sum,0);
     const total = Math.round(totals);

     const handleDelete=(item)=>{
        console.log(item)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          .then((result)=>{
            if(result.isConfirmed){
                fetch(`http://localhost:5000/carts/${item._id}`,{
                    method:'DELETE'
                })
                .then((res)=>res.json())
                .then(data=>{
                    console.log(data)

                    if(data.deletedCount > 0){
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    }
                })

            }
          })
     }

    return (
        <div className="w-2/3 mt-8">
      <Helmet>
        <title>BOOK SHOP | MY CART</title>
      </Helmet>
      <div  style={{borderRadius:'10px 10px 0 0'}} className="uppercase font-samibold h-[60px] flex justify-evenly items-center bg-[#D1A054]">
        <h1 className="text-2xl">Total Orders : {cart.length}</h1>
        <h1 className="text-2xl">Total Price :${total}</h1>
        <Link to='/dashboard/payment'><button className="btn btn-active btn-secondary btn-sm">pay</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase">
              <th>#</th>
              <th>Book</th>
              <th>Order Name</th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.imgUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-end">$ {item.price}</td>
                <td>
                  <button onClick={()=>handleDelete(item)} className="btn btn-ghost btn-sm text-white bg-red-600"><FaTrash></FaTrash></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyCart;