import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Books from '../../Hooks/Books';
import UseAxiosSource from '../../Hooks/UseAxiosSource';

const ManageBook = () => {
    const [book ,loading ,refetch] = Books();
    const[axiosSecure]=UseAxiosSource();
    const navigate =useNavigate();

    const handleUpdate =(item)=>{
        console.log(item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
          })
          .then((result)=>{
            if (result.isConfirmed) {
                refetch();
               console.log('done')
              }
              else{
                navigate("/dashboard/managebook");
              }
          })
    }

    const handleDelete =(item)=>{
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
            if (result.isConfirmed){
                axiosSecure.delete(`books/${item._id}`)
                .then(res =>{
                    // console.log('delete res',res.data)
                    if(res.data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ) 
                        refetch(); 
                    }
                })
            }
        })
    }

    return (
        <div className="w-full p-4">
      <div className="overflow-x-auto w-full rounded-t-lg mt-4">
        <table className="table w-full">
          {/* head */}
          <thead className="uppercase h-[60px] text-white bg-[#D1A054]">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {book.map((item, index) => (
              <tr key={item._id}
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.imgUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td className="text-right">${item.price}</td>
                <td>
                  <Link to={`/dashboard/updatebook/${item?._id}`}>  {" "}
                    <button onClick={handleUpdate} className="btn btn-ghost bg-orange-600  text-white btn-xs">
                      {" "}
                      <FaEdit></FaEdit>{" "}
                    </button></Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageBook;