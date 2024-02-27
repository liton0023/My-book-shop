import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrash, FaUserShield } from "react-icons/fa";
import Swal from 'sweetalert2';
import UseAxiosSource from '../../Hooks/UseAxiosSource';

const AllUsers = () => {
    const [axiosSecure]=UseAxiosSource();
    const { data: users = [], refetch } = useQuery({
       queryKey: ["users"],queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
          }
    })

    const handleMakeAdmin=(user)=>{
        fetch(`https://books-server-2.onrender.com/users/admin/${user._id}`,{
            method:'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
      }
      const handleDelete = (user) => {
        // TODO
      };
    return (
<div className="w-full p-4">
      <h1 className="text-2xl uppercase">Total users : {users.length}</h1>

      <div className="overflow-x-auto  rounded-t-lg mt-4 ">
        <table className="table table-xs">
          <thead className="uppercase h-[60px] text-white bg-[#D1A054]">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-ghost btn-sm text-white bg-orange-500"
                  >
                    <FaUserShield></FaUserShield>
                  </button>
                   
                  )}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-sm text-white bg-red-600"
                  >
                    <FaTrash></FaTrash>
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

export default AllUsers;